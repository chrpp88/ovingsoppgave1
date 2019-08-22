// Vertex shader program.
// Her er point-size fjernet, kun aktuell når man tegner punkter.
var VSHADER_SOURCE =
	'attribute vec4 a_Position;\n' +
	'attribute vec4 a_Color;\n' +
	'varying vec4 v_Color;\n' +
	'void main() {\n' +
	'  gl_Position = a_Position;\n' + 	// Verteksen.
	'  v_Color = a_Color;\n' +			// Videresender fargen
	'}\n';

// Fragment shader program
var FSHADER_SOURCE =
	'precision mediump float;\n' +
	'varying vec4 v_Color;\n' +			// Mottas via vaying-parametret i verteksshaderen. Interpolert verdi.
	'void main() {\n' +
	'  gl_FragColor = v_Color;\n' + // Fargeverdi.
	'}\n';

function main() {
	// Hent <canvas> elementet
	var canvas = document.getElementById('webgl');

	// Rendering context for WebGL:
	var gl = getWebGLContext(canvas);
	if (!gl) {
		console.log('Fikk ikke tak i rendering context for WebGL');
		return;
	}
	// Initialiser shadere:
	if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
		console.log('Feil ved initialisering av shaderkoden.');
		return;
	}

	//Initialiserer verteksbuffer:
	//var n = initVertexBuffers(gl);
	var n = initAxesVertices(gl);


	//Kopler til fargeattributt:
	//var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
	//if (u_FragColor < 0) {
	//	console.log('Fant ikke uniform-parametret u_FragColor i shaderen!?');
	//	return;
	//}
	//var rgba = [1.0, 1.0, 0.0, 1.0];
	//Sender inn fargeverdi:
	//gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

	//Rensker skjermen:
	gl.clearColor(0.0, 7.0, 0.4, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.drawArrays(gl.LINES, 0, n);

	var n = initVertexBuffers(gl);

	// Tegner trekanter:
	gl.drawArrays(gl.TRIANGLES, 0, n / 3);
	gl.drawArrays(gl.TRIANGLES, 3, n / 3);
	gl.drawArrays(gl.TRIANGLES, 6, n / 3);
}

function initAxesVertices(gl) {
	var axesVertices = new Float32Array([
		-1.0, 0.0, 0.0,
		1.0, 0.0, 0.0,
		0.0, 1.0, 0.0,
		0.0, -1.0, 0.0,
		0.0, 0.0, 1.0,
		0.0, 0.0, -1.0
	]);

	var axesColors = new Float32Array([
		1.0, 0.0, 0.0, 1.0,
		1.0, 0.0, 0.0, 1.0,
		0.0, 0.0, 1.0, 1.0,
		0.0, 0.0, 1.0, 1.0,
		0.0, 1.0, 0.0, 1.0,
		0.0, 1.0, 0.0, 1.0
	]);

	var n = axesVertices.length / 3; // Antall vertekser, hver verteks består av 3 floats.

	// Oppretter bufferobjekt for verteksene til aksene
	var axisBuffer = gl.createBuffer();
	if (!axisBuffer) {
		console.log('Klarte ikke å opprette buffer for verteksdata til aksene');
		return -1;
	}

	// Binder bufferobjektet
	gl.bindBuffer(gl.ARRAY_BUFFER, axisBuffer);

	// Skriver til bufferobjetet
	gl.bufferData(gl.ARRAY_BUFFER, axesVertices, gl.STATIC_DRAW);

	// Finner lokasjonen til a_Position i shaderen
	var locPosition = gl.getAttribLocation(gl.program, 'a_Position');
	if (locPosition < 0) {
		console.log('Fant ikke parameteret a_Position i shaderen!?');
		return -1;
	}

	// Koble verteksattributtet til bufferobjektet
	var floatsPerVertex = 3;
	gl.vertexAttribPointer(locPosition, floatsPerVertex, gl.FLOAT, false, 0, 0);

	// Enable verteksattributt
	gl.enableVertexAttribArray(locPosition);

	// Kopler fra bufferobjektet:
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	//Oppretter et bufferobjekt for verteksfarger
	var colorBuffer = gl.createBuffer();
	if (!colorBuffer) {
		console.log('Fikk ikke laget et bufferobjekt for farger!');
		return -1;
	}

	// Binder colorBuffer-objektet
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

	// Skriver til colorBuffer-objektet:
	gl.bufferData(gl.ARRAY_BUFFER, axesColors, gl.STATIC_DRAW);

	// Finner posisjonen til a_Color i shaderen
	var colAttrib = gl.getAttribLocation(gl.program, 'a_Color');
	if (colAttrib < 0 ) {
		console.log('Fant ikke parameteret a_Color i shaderen');
		return -1;
	}

	// Koble verteksattributtet a_Color til bufferobjektet
	var floatsPerVertexColor = 4;
	gl.vertexAttribPointer(colAttrib, floatsPerVertexColor, gl.FLOAT, false, 0, 0);

	// Enabler verteksshaderattributtpekeren
	gl.enableVertexAttribArray(colAttrib);

	// Kopler fra bufferobjektet:
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	return n;
}

function initVertexBuffers(gl) {
	//9 stk 2D vertekser:
	var vertices = new Float32Array([
		//front
		-0.5, 0.5, -0.5,
		-0.5, -0.5, -0.5,
		0.5, -0.5, -0.5,

		-0.5, 0.5, -0.5,
		0.5, -0.5, -0.5,
		0.5, 0.5, -0.5,

		//topp
		-0.5, 0.5, -0.5,
		0.5, 0.5, -0.5,
		-0.5, 0.5, 0.5,

		-0.5, 0.5, 0.5,
		0.5, 0.5, -0.5,
		0.5, 0.5, 0.5,

		//høyre
		0.5, 0.5, -0.5,
		0.5, -0.5, -0.5,
		0.5, -0.5, 0.5,

		0.5, -0.5, 0.5,
		0.5, 0.5, -0.5,
		0.5, 0.5, 0.5,

		//venstre
		-0.5, 0.5, -0.5,
		-0.5, -0.5, -0.5,
		-0.5, -0.5, 0.5,

		-0.5, -0.5, 0.5,
		-0.5, 0.5, -0.5,
		-0.5, 0.5, 0.5,

		//bunn
		-0.5, -0.5, -0.5,
		0.5, -0.5, -0.5,
		0.5, -0.5, 0.5,

		0.5, -0.5, 0.5,
		-0.5, -0.5, -0.5,
		-0.5, -0.5, 0.5,

		//baksiden
		-0.5, 0.5, 0.5,
		-0.5, -0.5, 0.5,
		0.5, -0.5, 0.5,

		0.5, -0.5, 0.5,
		-0.5, 0.5, 0.5,
		0.5, 0.5, 0.5
	]);

	//Farge på vertekser
	var colors = new Float32Array([
		0.3, 0.8, 0.1, 1.0,
		0.3, 0.8, 0.1, 1.0,
		0.3, 0.8, 0.1, 1.0,

		0.5, 0.4, 0.3, 1.0,
		0.5, 0.4, 0.3, 1.0,
		0.5, 0.4, 0.3, 1.0,

		0.3, 0.8, 0.1, 1.0,
		0.3, 0.8, 0.1, 1.0,
		0.3, 0.8, 0.1, 1.0,

		0.5, 0.4, 0.3, 1.0,
		0.5, 0.4, 0.3, 1.0,
		0.5, 0.4, 0.3, 1.0
	]);

	var n = vertices.length / 3; // Antall vertekser, hver verteks består av 3 floats.

	// Oppretter et bufferobjekt:
	var positionBuffer = gl.createBuffer();
	if (!positionBuffer) {
		console.log('Fikk ikke laget et bufferobjekt!?');
		return -1;
	}

	// Binder bufferobjektet:
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	// Skriver til bufferobjektet:
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

	// Finner posisjonen til a_Position i shaderen:
	var posAttrib = gl.getAttribLocation(gl.program, 'a_Position');
	if (posAttrib < 0) {
		console.log('Fant ikke parametret a_Position i shaderen!?');
		return -1;
	}

	// Kople verteksattributtett til bufferobjektet:
	var floatsPerVertex = 3;
	gl.vertexAttribPointer(posAttrib, floatsPerVertex, gl.FLOAT, false, 0, 0);

	// Enabler verteksshaderattributtpekeren:
	gl.enableVertexAttribArray(posAttrib);

	// Kopler fra bufferobjektet:
	gl.bindBuffer(gl.ARRAY_BUFFER, null);



	//Oppretter et bufferobjekt for verteksfarger
	var colorBuffer = gl.createBuffer();
	if (!colorBuffer) {
		console.log('Fikk ikke laget et bufferobjekt for farger!');
		return -1;
	}

	// Binder colorBuffer-objektet
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

	// Skriver til colorBuffer-objektet:
	gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

	// Finner posisjonen til a_Color i shaderen
	var colAttrib = gl.getAttribLocation(gl.program, 'a_Color');
	if (colAttrib < 0 ) {
		console.log('Fant ikke parameteret a_Color i shaderen');
		return -1;
	}

	// Koble verteksattributtet a_Color til bufferobjektet
	var floatsPerVertexColor = 4;
	gl.vertexAttribPointer(colAttrib, floatsPerVertexColor, gl.FLOAT, false, 0, 0);

	// Enabler verteksshaderattributtpekeren
	gl.enableVertexAttribArray(colAttrib);

	return n;
}

