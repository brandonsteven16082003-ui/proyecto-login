// ============================================================
// app.js - Lógica del front-end (consume el servicio web)
// Actividad: GA7-220501096-AA4-EV03
// ============================================================

// Referencias a los elementos de la página
const formulario = document.getElementById('formulario');
const tabLogin = document.getElementById('tabLogin');
const tabRegistro = document.getElementById('tabRegistro');
const botonEnviar = document.getElementById('botonEnviar');
const mensaje = document.getElementById('mensaje');

// Modo actual: 'login' o 'registro'
let modo = 'login';

// Cambia entre las pestañas de login y registro
function cambiarModo(nuevoModo) {
  modo = nuevoModo;
  tabLogin.classList.toggle('activa', modo === 'login');
  tabRegistro.classList.toggle('activa', modo === 'registro');
  botonEnviar.textContent = modo === 'login' ? 'Iniciar sesión' : 'Registrarse';
  mensaje.textContent = ''; // Limpia mensajes anteriores
}

tabLogin.addEventListener('click', () => cambiarModo('login'));
tabRegistro.addEventListener('click', () => cambiarModo('registro'));

// Envía los datos al servicio web cuando se presiona el botón
formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault(); // Evita que la página se recargue

  const usuario = document.getElementById('usuario').value;
  const contrasena = document.getElementById('contrasena').value;

  // Elegimos la ruta de la API según el modo
  const ruta = modo === 'login' ? '/api/login' : '/api/registro';

  try {
    // Petición POST al servicio web con los datos en formato JSON
    const respuesta = await fetch(ruta, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, contrasena })
    });

    const datos = await respuesta.json();

    // Mostramos el mensaje devuelto por el servicio
    mensaje.textContent = datos.mensaje;
    mensaje.className = datos.exito ? 'ok' : 'error';
  } catch (error) {
    // Error de conexión con el servidor
    mensaje.textContent = 'No se pudo conectar con el servidor';
    mensaje.className = 'error';
  }
});
