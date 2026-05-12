
 // 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
  



const TAMANIO_CELDA = 25;
const lINEASX = canvas.width / TAMANIO_CELDA;
const LINEASY = canvas.height  / TAMANIO_CELDA;

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
  pintarParte(5,5);
  pintarParte(5,1);
  pintarParte(0,3);
  pintarParte(10,2);
  pintarParte(15,23);
  pintarParte(23,15);
  pintarParte(0,15);
  pintarParte(23,0);
}

function dibujarTablero(){
// ctx.strokeStyle = "blue"; // define el color de la linea
//ctx.beginPath(); //Le dice al lapiz voy a empezar a dibujar la linea
// ctx.moveTo(25,0); //Levanta el lapiz y lo pone en la poscion 0,0
// ctx.lineTo(25,600); //Traza una linea hasta el centro del canvas
// ctx.stroke(); //Finaliza dibuja la linea  
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
function pintarParte(LINEASX, LINEASY){
  let pintar1 = LINEASX*TAMANIO_CELDA;
  let pintar2 = LINEASY*TAMANIO_CELDA;
  ctx.fillStyle = "yellow";
  ctx.fillRect(pintar1, pintar2, TAMANIO_CELDA, TAMANIO_CELDA);
  ctx.strokeStyle = "#c522c5";
  ctx.strokeRect(pintar1, pintar2, TAMANIO_CELDA, TAMANIO_CELDA);
}
