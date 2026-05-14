
 // 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
  



const TAMANIO_CELDA = 25;
const LINEASX = canvas.width / TAMANIO_CELDA;
const LINEASY = canvas.height  / TAMANIO_CELDA;
const serpiente = [
  {LINEASX: 15, LINEASY:15},
  {LINEASX: 15, LINEASY:16},
  {LINEASX: 16, LINEASY:16},
  {LINEASX: 17, LINEASY:16},
  {LINEASX: 18, LINEASY:16},
  {LINEASX: 19, LINEASY:16},
  {LINEASX: 19, LINEASY:17},
  {LINEASX: 19, LINEASY:18},
  {LINEASX: 19, LINEASY:19},
  {LINEASX: 18, LINEASY:19},
  {LINEASX: 18, LINEASY:19},
  {LINEASX: 17, LINEASY:19},
  {LINEASX: 16, LINEASY:19},

];
let intervaloSerpiente; // variable que almacena el intervalo del movimiento  de la serpiente 
let direccionActual = "derecha"; // Guarada la ultima direccion seleccionada 

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
  dibujarTablero();
  pintarSerpiente();
  pintarComida();
  
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

function pintarSerpiente(){
  //CABEZA DE LA SERPIENTE
  let cabeza = serpiente[0];
  ctx.fillStyle = "red";
 
  ctx.fillRect(cabeza.LINEASX*TAMANIO_CELDA,
     cabeza.LINEASY*TAMANIO_CELDA,
      TAMANIO_CELDA,
      TAMANIO_CELDA);
  // CUERPO DE LA SERPIENTE 
  ctx.fillStyle ="green";
  //Como va a pintar el cuerpo de la serpiente, recorre el array de la serpiente y pinta cada parte del cuerpo 

  for(let i=1; i<serpiente.length; i++){
    ctx.fillRect(serpiente[i].LINEASX*TAMANIO_CELDA,
       serpiente[i].LINEASY*TAMANIO_CELDA,
        TAMANIO_CELDA,
        TAMANIO_CELDA);
  }
 
}
function moverDerecha(){
  //serpiente[0] es la cabeza actual 
  //Para ir a la derecha, sumamos 1 solo en x (Columna)
  //Se queda en la misma posicion porque no subimos ni bajamos 
  let nuevaCabeza ={
    LINEASX: serpiente[0].LINEASX + 1, //Una celda a la derecha
    LINEASY: serpiente[0].LINEASY      //misma fila
  };
  serpiente.unshift(nuevaCabeza); //Agregamos la nueva cabeza al inicio del arreglo
  serpiente.pop();                //Eliminamos la ultima parte de la serpiente 
}
function cambiarDireccion(direccion){
  //"direccion" puede llegar como derecha, arriba, abajo, izquierda
  //Indicamos cual llego para saber cual es la correcta
  //if(direccionActual === 'derecha'){
   // moverDerecha(); // solo se llama si llego la derecha
   // Actualiza la direccion actual para evitar movimientos invalidos 
  direccionActual = direccion; 
}

function moverIzquierda(){
  let nuevaCabeza = {
  LINEASX: serpiente[0].LINEASX -1,
  LINEASY: serpiente[0].LINEASY
};
serpiente.unshift(nuevaCabeza);
serpiente.pop();
}
function moverArriba(){
  let nuevaCabeza = {
    LINEASX: serpiente[0].LINEASX,
    LINEASY: serpiente[0].LINEASY - 1,
  };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}
function moverAbajo(){
  let nuevaCabeza = {
    LINEASX: serpiente[0].LINEASX,
    LINEASY: serpiente[0].LINEASY + 1,
  };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}
function iniciarJuego(){
  intervaloSerpiente = setInterval(moverSerpiente, 1000); 
}
function pausarJuego(){
  clearInterval(intervaloSerpiente); // detiene el intervalos del movimieto de la serpiente 
}
function moverSerpiente(){
  //por ahora solo imprimimos para probar que funcione 
  if(direccionActual === 'derecha'){
    moverDerecha();
  }else if(direccionActual === 'izquierda'){
    moverIzquierda();
  }else if(direccionActual === 'arriba'){
    moverArriba();
  }else if(direccionActual === 'abajo'){
    moverAbajo();
  }
  pintarSerpiente();
  ///let puntaje = 0;
  //document.getElementById("puntaje").innerText = `Puntaje: ${puntaje}`;
  //if(atraparComida() == true){
    //  puntaje++;
    //}
}
function pintarComida(){
  // Generar coodernaas aeleatorias para la comida
  let comidaX = Math.floor(Math.random() * canvas.width / TAMANIO_CELDA);
  let comidaY = Math.floor(Math.random() * canvas.height / TAMANIO_CELDA);
  
  // pintamos la comida en el canvas con diferencia de color
  ctx.fillStyle = "orange";
  pintarParte(comidaX, comidaY);
}
function atraparComida(){
  // verificar si la cabeza de la serpiente toca la comida 
  if(serpiente[0].LINEASX === comidaX && serpiente[0].LINEASY === comidaY){
    // si atrapa la comida retorna true 
    return true;
  }else{
    // si no atrapa la comida retorna false
    return false;
  }

}