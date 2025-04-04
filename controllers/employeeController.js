const pool = require('../db');

// Obtener todos los empleados
exports.getAllEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employees ORDER BY Name');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los empleados:', error);
    res.status(500).json({ error: 'Error al obtener los empleados' });
  }
};

// Obtener un empleado por ID
exports.getEmployeeById = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener el empleado:', error);
    res.status(500).json({ error: 'Error al obtener el empleado' });
  }
};

// Crear un nuevo empleado
exports.createEmployee = async (req, res) => {
  const { name, email, atc, level, role, project, status } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'El nombre del empleado es obligatorio' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO employees (Name, Email, ATC, Level, Role, Project, Status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, atc, level, role, project, status]
    );
    
    res.status(201).json({
      id: result.insertId,
      name,
      email,
      atc,
      level,
      role,
      project,
      status
    });
  } catch (error) {
    console.error('Error al crear el empleado:', error);
    res.status(500).json({ error: 'Error al crear el empleado' });
  }
};

// Actualizar un empleado existente
exports.updateEmployee = async (req, res) => {
  const { name, email, atc, level, role, project, status } = req.body;
  const employeeId = req.params.id;
  
  if (!name) {
    return res.status(400).json({ error: 'El nombre del empleado es obligatorio' });
  }

  try {
    const [existingEmployee] = await pool.query('SELECT * FROM employees WHERE id = ?', [employeeId]);
    if (existingEmployee.length === 0) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    
    // Actualizar el empleado
    await pool.query(
      'UPDATE employees SET Name = ?, Email = ?, ATC = ?, Level = ?, Role = ?, Project = ?, Status = ? WHERE id = ?',
      [name, email, atc, level, role, project, status, employeeId]
    );
    
    res.json({
      id: parseInt(employeeId),
      name, 
      email, 
      atc,
      level, 
      role, 
      project, 
      status
    });
  } catch (error) {
    console.error('Error al actualizar el empleado:', error);
    res.status(500).json({ error: 'Error al actualizar el empleado' });
  }
};

// Eliminar un empleado
exports.deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;

  try {
    const [existingEmployee] = await pool.query('SELECT * FROM employees WHERE id = ?', [employeeId]);
    if (existingEmployee.length === 0) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    
    await pool.query('DELETE FROM employees WHERE id = ?', [employeeId]);
    res.json({ message: 'Empleado eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el empleado:', error);
    res.status(500).json({ error: 'Error al eliminar el empleado' });
  }
};
