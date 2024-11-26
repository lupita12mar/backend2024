const purchasesQueries = {
    getAll: 'SELECT * FROM purchases',
    getById: 'SELECT * FROM purchases WHERE id = ?',
    create: 'INSERT INTO purchases (products_suppliers_id, quantity, purchase_date, payment_method, ticket, invoice, price) VALUES (?, ?, ?, ?, ?, ?, ?)',
    update: 'UPDATE purchases SET products_suppliers_id = ?, quantity = ?, purchase_date = ?, payment_method = ?, ticket = ?, invoice = ?, price = ? WHERE id = ?',
    delete: 'DELETE FROM purchases WHERE id = ?',
  };
  
  module.exports = { purchasesQueries };