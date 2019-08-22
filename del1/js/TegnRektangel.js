// TegnRektangel.js
// 
 function main() {
	 // Henter <canvas> elementet:
	 var canvas = document.getElementById('eksempel_1');
	 if (!canvas) {
		 console.log('Fikk ikke hentet <canvas> elementet');
		 return;
	 }
	 
	 // RenderingContext for 2D                         
	 var ctx = canvas.getContext('2d');
	 // Tegner et bl�tt rektangel:                                      
	 ctx.fillStyle = 'rgba(0, 0, 255, 1.0)'; // Bruk bl� farge
	 ctx.fillRect(120, 10, 150, 150); // Fylt rektangel
}