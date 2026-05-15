
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
  {LINEASX: 18, LINEASY:16}
];
let intervaloSerpiente; // variable que almacena el intervalo del movimiento  de la serpiente 
let direccionActual = "derecha"; // Guarada la ultima direccion seleccionada 
let comidaX;
let comidaY;
let puntaje = 0;
let velocidad = 300; //velocidad aunmentara a medida que avance de nivel 


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
function pintarParte(LINEASX, LINEASY, color){
  let pintar1 = LINEASX*TAMANIO_CELDA;
  let pintar2 = LINEASY*TAMANIO_CELDA;
  ctx.fillStyle = color;
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
  // Si la serpiente va a la derecha, no puede ir a la izquierda
  if(direccionActual === 'derecha' && direccion === 'izquierda'){
    return;// detiene la función e ignora el cambio de dirección
  }
  // Si la serpiente va a la izquierda, no puede ir a la derecha
  if(direccionActual === 'izquierda' && direccion === 'derecha'){
    return;// detiene la función e ignora el cambio de dirección
  }
  // Si la serpiente va para arriba, no puede ir para abajo
  if(direccionActual === 'arriba' && direccion === 'abajo'){
    return;// detiene la función e ignora el cambio de dirección
  }
  // Si la serpiente va para abajo, no puede ir para arriba
  if(direccionActual === 'abajo' && direccion === 'arriba'){
    return;// detiene la función e ignora el cambio de dirección
  }
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
  // Inicia el movimiento automático de la serpiente ejecutando 
  // moverSerpiente() cada cierto tiempo según la variable velocidad
  intervaloSerpiente = setInterval(moverSerpiente, velocidad);
  generarComida(); 
}
function pausarJuego(){
  // detiene el intervalos del movimieto de la serpiente 
  clearInterval(intervaloSerpiente); 
}
function moverSerpiente(){
  //Dependiendo de la direccion actual, se llama a la funcion correspondiente para mover
  if(direccionActual === 'derecha'){moverDerecha();
  }else if(direccionActual === 'izquierda'){moverIzquierda();
  }else if(direccionActual === 'arriba'){moverArriba();
  }else if(direccionActual === 'abajo'){moverAbajo(); 
  }
  //valida que el juego termine si la cabeza de la serpiente esta fuera del lienzo 
  if(serpiente[0].LINEASX < 0 || serpiente[0].LINEASX >= 24 || serpiente[0].LINEASY < 0 || serpiente[0].LINEASY >= 24){
    pausarJuego();
    document.getElementById("mensaje").innerText = "Juego terminado - reinicia para jugar de nuevo";
    //Detiene el juego 
    return; 
  }
  //redibuja la serpiente en una nueva posicion 
  dibujarTodo();
  //Verifica si la cabeza d ela serpente toco la comida 
  if(atraparComida() == true){
    //Si atrapo la comida, suma 1  al puntaje
    puntaje++;
    generarComida();
     //Si atrapo la comida la serpiente crece, agregamos un nuevo segmento al final
    serpiente.push(serpiente[serpiente.length - 1]);
  }
  //Actualiza el puntaje en el HTML 
  document.getElementById("puntaje").innerText = puntaje; 
}
function pintarComida(){
  // pintamos la comida en el canvas con diferencia de color
  pintarParte(comidaX, comidaY, "orange");
}
function generarComida(){
  // Generar coodernaas aeleatorias para la comida
  comidaX = Math.floor(Math.random() * canvas.width / TAMANIO_CELDA);
  comidaY = Math.floor(Math.random() * canvas.height / TAMANIO_CELDA);
  
}
function atraparComida(){
  // verificar si la cabeza de la serpiente toca la comida 
  if(serpiente[0].LINEASX === comidaX && serpiente[0].LINEASY === comidaY){
    // si atrapa la comida retorna true 
    console.log("Comida atrapada");
    return true;
  }else{
    // si no atrapa la comida retorna false
    console.log("Comida no atrapada");
    return false;
  }
}
function reiniciarJuego(){
  //limpiar el tablero 
  limpiarCanvas();
  //Esto elimina todos los elementos del arreglo sin reasignarlos
  serpiente.length = 0;
  //push agrega nuevos elementos al arreglo, en este caso en la mismas posicion inicial
  serpiente.push(
      {LINEASX: 15, LINEASY:15},
      {LINEASX: 15, LINEASY:16},
      {LINEASX: 16, LINEASY:16},
      {LINEASX: 17, LINEASY:16},
      {LINEASX: 18, LINEASY:16}
  );
  //Reinicia la direccion a la derecha 
  direccionActual = "derecha";
  //Reinicia el puntaje a 0
  puntaje = 0;
  //Actualiza el puntae en el HTML
  document.getElementById("puntaje").innerText = puntaje;
  //Detenemos el juego si estaba en curso
  pausarJuego();
  //Inicia el juego de nuevo
  iniciarJuego();
  //Limpia el mensaje de juego terminado 
  document.getElementById("mensaje").innerText = "";
  dibujarTodo();
}
