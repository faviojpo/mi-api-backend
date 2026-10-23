import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Datos simulados
const productos = [
  { id: 1, nombre: 'Laptop Gamer', categoria: 'tecnologia', precio: 1200 },
  { id: 2, nombre: 'Teclado Mecánico', categoria: 'tecnologia', precio: 80 },
  { id: 3, nombre: 'Silla Ergonómica', categoria: 'muebles', precio: 250 },
  { id: 4, nombre: 'Monitor 4K', categoria: 'tecnologia', precio: 400 },
  { id: 5, nombre: 'Escritorio de Madera', categoria: 'muebles', precio: 150 }
];

// 1. Ruta HTML
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Bienvenido a la API</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f9; color: #333; padding: 2rem; text-align: center; }
        h1 { color: #2c3e50; }
        p { font-size: 1.2rem; }
      </style>
    </head>
    <body>
      <h1>🚀 ¡Bienvenido a nuestra API REST en Node.js!</h1>
      <p>Servidor activo y listo para procesar solicitudes.</p>
    </body>
    </html>
  `);
});

// 2. Ruta JSON (Usuarios)
app.get('/api/v1/usuarios', (req, res) => {
  const usuarios = [
    { id: 1, nombre: 'Ana Gómez', email: 'ana@example.com', rol: 'Admin' },
    { id: 2, nombre: 'Carlos López', email: 'carlos@example.com', rol: 'User' },
    { id: 3, nombre: 'María Rodríguez', email: 'maria@example.com', rol: 'User' }
  ];
  res.status(200).json({ status: 'success', count: usuarios.length, data: usuarios });
});

// 3. Ruta Path Params (Producto por ID)
app.get('/api/v1/productos/:id', (req, res) => {
  const { id } = req.params;
  const productoEncontrado = productos.find((p) => p.id === parseInt(id, 10));

  if (!productoEncontrado) {
    return res.status(404).json({ status: 'error', mensaje: `No se encontró el producto con ID: ${id}` });
  }

  res.status(200).json({ status: 'success', data: productoEncontrado });
});

// 4. Ruta Query Params (Filtrar productos)
app.get('/api/v1/productos', (req, res) => {
  const { categoria, precioMax } = req.query;
  let resultado = [...productos];

  if (categoria) {
    resultado = resultado.filter((p) => p.categoria.toLowerCase() === categoria.toLowerCase());
  }
  if (precioMax) {
    resultado = resultado.filter((p) => p.precio <= parseFloat(precioMax));
  }

  res.status(200).json({ status: 'success', totalResultados: resultado.length, data: resultado });
});

// Middleware 404
app.use((req, res) => {
  res.status(404).json({ status: 'fail', mensaje: `Ruta no encontrada: ${req.originalUrl}` });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo exitosamente en http://localhost:${PORT}`);
});