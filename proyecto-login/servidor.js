// ============================================================
// servidor.js - Servicio web de registro e inicio de sesión
// Actividad: GA7-220501096-AA5-EV01
// ============================================================

// Importamos las librerías necesarias
const express = require('express'); // Framework para crear el servidor
const cors = require('cors');       // Permite peticiones desde otros orígenes
const path = require('path');       // Manejo de rutas de archivos

const app = express();
const PUERTO = 3000;

// ---------------- Configuración (middlewares) ----------------
app.use(cors());                                   // Habilita CORS
app.use(express.json());                           // Permite leer JSON en el body
app.use(express.static(path.join(__dirname, 'public'))); // Sirve el front-end

// Lista en memoria donde se guardan los usuarios registrados
// (para esta actividad no se requiere base de datos)
const usuarios = [];

// ---------------- Servicio 1: REGISTRO ----------------
// Método POST a /api/registro
app.post('/api/registro', (req, res) => {
  const { usuario, contrasena } = req.body;

  // Validamos que lleguen ambos datos
  if (!usuario || !contrasena) {
    return res.status(400).json({
      exito: false,
      mensaje: 'Debe enviar usuario y contraseña'
    });
  }

  // Verificamos que el usuario no exista ya
  const existe = usuarios.find(u => u.usuario === usuario);
  if (existe) {
    return res.status(409).json({
      exito: false,
      mensaje: 'El usuario ya está registrado'
    });
  }

  // Guardamos el nuevo usuario
  usuarios.push({ usuario, contrasena });
  res.status(201).json({
    exito: true,
    mensaje: 'Usuario registrado correctamente'
  });
});

// ---------------- Servicio 2: INICIO DE SESIÓN ----------------
// Método POST a /api/login
app.post('/api/login', (req, res) => {
  const { usuario, contrasena } = req.body;

  // Buscamos un usuario que coincida con usuario y contraseña
  const valido = usuarios.find(
    u => u.usuario === usuario && u.contrasena === contrasena
  );

  if (valido) {
    // Autenticación correcta
    return res.status(200).json({
      exito: true,
      mensaje: 'Autenticación satisfactoria'
    });
  }

  // Autenticación incorrecta
  res.status(401).json({
    exito: false,
    mensaje: 'Error en la autenticación'
  });
});

// ---------------- Inicio del servidor ----------------
app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
