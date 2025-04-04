// server.js
const express = require('express');
const cors = require('cors');
const employeeRoutes = require('./routes/employeesRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/employees', employeeRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('API de Empleados funcionando correctamente');
});

// Escuchar en el puerto
app.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto ${PORT}');
});