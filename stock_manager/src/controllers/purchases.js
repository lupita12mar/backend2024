const { request, response } = require('express');
const pool = require('../db/connection');
const { purchasesQueries } = require('../models/purchases');

// Obtener todas las compras
const getAllPurchases = async (req = request, res = response) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const purchases = await conn.query(purchasesQueries.getAll);
    res.send(purchases);
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (conn) conn.end();
  }
};

// Obtener una compra por ID
const getPurchaseById = async (req = request, res = response) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.status(400).send('Invalid ID');
    return;
  }

  let conn;
  try {
    conn = await pool.getConnection();
    const purchase = await conn.query(purchasesQueries.getById, [+id]);
    if (purchase.length === 0) {
      res.status(404).send('Purchase not found');
      return;
    }
    res.send(purchase);
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (conn) conn.end();
  }
};

// Crear una nueva compra
const createPurchase = async (req = request, res = response) => {
  const { 
    products_suppliers_id, 
    quantity, 
    purchase_date, 
    payment_method, 
    ticket, 
    invoice, 
    price 
} = req.body;

  if (
    !products_suppliers_id || 
    !quantity || 
    !purchase_date || 
    !payment_method || 
    !ticket || 
    !invoice || 
    !price
) {
    res.status(400).send('Bad request');
    return;
  }

  let conn;
  try {
    conn = await pool.getConnection();

    const newPurchase = await conn.query(purchasesQueries.create, [
      products_suppliers_id,
      quantity,
      purchase_date,
      payment_method,
      ticket,
      invoice,
      price,
    ]);

    if (newPurchase.affectedRows === 0) {
      res.status(500).send('Purchase not created');
      return;
    }

    res.status(201).send('Purchase created successfully');
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (conn) conn.end();
  }
};

// Actualizar una compra
const updatePurchase = async (req = request, res = response) => {
  const { id } = req.params;
  const { 
    products_suppliers_id, 
    quantity, 
    purchase_date, 
    payment_method, 
    ticket, 
    invoice, 
    price } = req.body;

  if (isNaN(id) || 
  !products_suppliers_id ||
   !quantity || 
   !purchase_date || 
   !payment_method || 
   !ticket || 
   !invoice || 
   !price) {
    res.status(400).send('Invalid request');
    return;
  }

  let conn;
  try {
    conn = await pool.getConnection();
    const purchase = await conn.query(purchasesQueries.getById, [+id]);
    if (purchase.length === 0) {
      res.status(404).send('Purchase not found');
      return;
    }

    const updatedPurchase = await conn.query(purchasesQueries.update, [
      products_suppliers_id,
      quantity,
      purchase_date,
      payment_method,
      ticket,
      invoice,
      price,
      id,
    ]);

    if (updatedPurchase.affectedRows === 0) {
      res.status(500).send('Purchase could not be updated');
      return;
    }

    res.send('Purchase updated successfully');
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (conn) conn.end();
  }
};

// Eliminar una compra
const deletePurchase = async (req = request, res = response) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.status(400).send('Invalid ID');
    return;
  }

  let conn;
  try {
    conn = await pool.getConnection();
    const purchase = await conn.query(purchasesQueries.getById, [+id]);
    if (purchase.length === 0) {
      res.status(404).send('Purchase not found');
      return;
    }

    const deletePurchase = await conn.query(purchasesQueries.delete, [+id]);
    if (deletePurchase.affectedRows === 0) {
      res.status(500).send('Purchase could not be deleted');
      return;
    }

    res.send('Purchase deleted successfully');
  } catch (error) {
    res.status(500).send(error);
  } finally {
    if (conn) conn.end();
  }
};

module.exports = { getAllPurchases, getPurchaseById, createPurchase, updatePurchase, deletePurchase };