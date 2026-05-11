
 // 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
  



const TAMANIO_CELDA = 25;

  // Primera pintura del juego al cargar la página
dibujarTodo();

// =========================
// FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
  ctx.fillStyle = "green";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero()
}

function dibujarTablero(){
  ctx.strokeStyle = "blue"; // define el color de la linea
  ctx.beginPath(); //Le dice al lapiz voy a empezar a dibujar la linea
  ctx.moveTo(25,0); //Levanta el lapiz y lo pone en la poscion 0,0
  ctx.lineTo(25,600); //Traza una linea hasta el centro del canvas
  ctx.stroke(); //Finaliza dibuja la linea
  ////
  ctx.strokeStyle = "blue"; // define el color de la linea
  ctx.beginPath(); //Le dice al lapiz voy a empezar a dibujar la linea
  ctx.moveTo(50,0); //Levanta el lapiz y lo pone en la poscion 0,0
  ctx.lineTo(50,600); //Traza una linea hasta el centro del canvas
  ctx.stroke(); //Finaliza dibuja la linea
  ////
  ctx.strokeStyle = "blue"; // define el color de la linea
  ctx.beginPath(); //Le dice al lapiz voy a empezar a dibujar la linea
  ctx.moveTo(75,0); //Levanta el lapiz y lo pone en la poscion 0,0
  ctx.lineTo(75,600); //Traza una linea hasta el centro del canvas
  ctx.stroke(); 
  
  for(let i=0; i <= canvas.width; i+=TAMANIO_CELDA){
    ctx.strokeStyle = "blue"; // define el color de la linea
    ctx.beginPath(); //Le dice al lapiz voy a empezar a dibujar la linea
    ctx.moveTo(i,0); //Levanta el lapiz y lo pone en la poscion 0,0
    ctx.lineTo(i, canvas.height); //Traza una linea hasta el centro del canvas
    ctx.stroke();
  }
  for(let i=0; i<=canvas.height; i+=TAMANIO_CELDA){
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(0,i);
    ctx.lineTo(canvas.width,i);
    ctx.stroke();
  }
}



