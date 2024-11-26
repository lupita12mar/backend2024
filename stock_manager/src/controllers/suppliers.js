const { request, response } = require('express');
const pool = require('../db/connection');
const { suppliersQueries } = require('../models/suppliers');

// Obtener todos los proveedores
const getAllSuppliers = async (req = request, res = response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const suppliers = await conn.query(suppliersQueries.getAll);
    res.send(suppliers);
  } catch (error) {
    res.status(500).send(error); 
    return;
  } finally {
    if (conn) conn.end();
  }
};

// Obtener un proveedor por su RFC
const getSupplierByRfc = async (req = request, res = response) => {
  const { rfc } = req.params;

  let conn;
  try {
    conn = await pool.getConnection();
    const supplier = await conn.query(suppliersQueries.getByRfc, [rfc]);
    if (supplier.length === 0) {
      res.status(404).send('Supplier not found');
      return;
    }

    res.send(supplier);
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (conn) conn.end();
  }
};

// Crear un nuevo proveedor
const createSupplier = async (req = request, res = response) => {
  const { 
    rfc, 
    name, 
    description, 
    phone_number, 
    email, 
    address} = req.body;

  if (
    !rfc || 
    !name ||
    !description ||
    !phone_number ||
    !email || 
    !address
) {
    res.status(400).send('Bad request');
    return;
  }

  let conn;
  try {
    conn = await pool.getConnection();

    // Verificar si el proveedor ya existe
    const existingSupplier = await conn.query(suppliersQueries.getByRfc, [rfc]);
    if (existingSupplier.length > 0) {
      res.status(409).send('Supplier already exists');
      return;
    }

    const newSupplier = await conn.query(suppliersQueries.create, [
        rfc, 
        name, 
        description, 
        phone_number, 
        email, 
        address,
    ]);

    if (newSupplier.affectedRows === 0) {
      res.status(500).send('Supplier could not be created');
      return;
    }

    res.status(201).send("Supplier created successfully");
  } catch (error) {
    res.status(500).send(error);
    return;
  } finally {
    if (conn) conn.end();
  }
};

// Actualizar un proveedor
const updateSupplier = async (req = request, res = response) => {
  const { rfc } = req.params;
  const { 
    name, 
    description, 
    phone_number, 
    email, 
    address
} = req.body;

if (!rfc || !name || !description || !phone_number || !email || !address) {
    res.status(400).send('Invalid request');
    return;
  }
  

  let conn;
  try {
    conn = await pool.getConnection();

    const supplier = await conn.query(suppliersQueries.getByRfc, [rfc]);
    if (supplier.length === 0) {
      res.status(404).send('Supplier not found');
      return;
    }

    const updatedSupplier = await conn.query(suppliersQueries.update, [
        name, 
        description, 
        phone_number, 
        email, 
        address,
        rfc
    ]);

    if (updatedSupplier.affectedRows === 0) {
      res.status(500).send('Supplier could not be updated');
      return;
    }

    res.send('Supplier updated successfully');
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (conn) conn.end();
  }
};

// Eliminar un proveedor
const deleteSupplier = async (req = request, res = response) => {
  const { rfc } = req.params;

  let conn;
  try {
    conn = await pool.getConnection();
    const supplier = await conn.query(suppliersQueries.getByRfc, [rfc]);
    if (supplier.length === 0) {
      res.status(404).send('Supplier not found');
      return;
    }

    const deleteSupplier = await conn.query(suppliersQueries.delete, [rfc]);

    if (deleteSupplier.affectedRows === 0) {
      res.status(500).send('Supplier could not be deleted');
      return;
    }

    res.send('Supplier deleted successfully');
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (conn) conn.end();
  }
};

module.exports = { getAllSuppliers, getSupplierByRfc, createSupplier, updateSupplier, deleteSupplier };