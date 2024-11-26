const { request, response } = require('express');
const pool = require('../db/connection');
const { productsQueries } = require('../models/products');

// Obtener todos los productos
const getAllProducts = async (req = request, res = response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const products = await conn.query(productsQueries.getAll);
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (conn) conn.end();
  }
};

// Obtener producto por ID
const getProductById = async (req = request, res = response) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.status(400).send('Invalid ID');
    return;
  }

  let conn;
  try {
    conn = await pool.getConnection();
    const product = await conn.query(productsQueries.getById, [+id]);

    if (product.length === 0) {
      res.status(404).send('Product not found');
      return;
    }

    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (conn) conn.end();
  }
};

// Crear un nuevo producto
const createProduct = async (req = request, res = response) => {
  const { product, description, stock, measurement_unit, price, discount } = req.body;

  if (
    !product || 
    !description || 
    !stock || 
    !measurement_unit || 
    !price || 
    !discount
  ) {
    res.status(400).send('Missing required fields');
    return;
  }

  let conn;
  try {
    conn = await pool.getConnection();
    const newProduct = await conn.query(productsQueries.create, [
      product,
      description,
      stock,
      measurement_unit,
      price,
      discount,
    ]);

    if (newProduct.affectedRows === 0) {
      res.status(500).send('Product could not be created');
      return;
    }

    res.status(201).send('Product created successfully');
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (conn) conn.end();
  }
};

// Actualizar un producto
const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { product, description, stock, measurement_unit, price, discount } = req.body;

  if (isNaN(id) || !product || !description || !stock|| ! measurement_unit || !price || !discount ) {
    res.status(400).send('Invalid request');
    return;
  }

  let conn;
  try {
    conn = await pool.getConnection();
    const productExists = await conn.query(productsQueries.getById, [+id]);

    if (productExists.length === 0) {
      res.status(404).send('Product not found');
      return;
    }

    const result = await conn.query(productsQueries.update, [
      product,
      description,
      stock || 0,
      measurement_unit,
      price,
      discount || 0,
      +id,
    ]);

    if (result.affectedRows === 0) {
      res.status(500).send('Product could not be updated');
      return;
    }

    res.send('Product updated successfully');
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (conn) conn.end();
  }
};

// Eliminar un producto
const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.status(400).send('Invalid ID');
    return;
  }

  let conn;
  try {
    conn = await pool.getConnection();
    const productExists = await conn.query(productsQueries.getById, [+id]);

    if (productExists.length === 0) {
      res.status(404).send('Product not found');
      return;
    }

    const result = await conn.query(productsQueries.delete, [+id]);

    if (result.affectedRows === 0) {
      res.status(500).send('Product could not be deleted');
      return;
    }

    res.send('Product deleted successfully');
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (conn) conn.end();
  }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };