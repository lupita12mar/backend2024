const suppliersQueries = {
    getAll: 'SELECT * FROM suppliers WHERE is_active = 1',
    getByRfc: 'SELECT * FROM suppliers WHERE rfc = ? AND is_active = 1',
    create: `INSERT INTO suppliers (
        rfc, 
        name, 
        description, 
        phone_number, 
        email, 
        address
      ) VALUES (?, ?, ?, ?, ?, ?)
    `,
    update: `UPDATE suppliers 
      SET 
        name = ?, 
        description = ?, 
        phone_number = ?, 
        email = ?, 
        address = ?
      WHERE rfc = ?
    `,
    delete: 'UPDATE suppliers SET is_active = 0 WHERE rfc = ?',
  };
  
  module.exports = { suppliersQueries };