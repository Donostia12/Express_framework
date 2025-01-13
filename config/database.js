// config/database.js
const { db } = require("./server");

const Database = {
  getAll: (table, callback) => {
    const query = `SELECT * FROM ${table}`;
    db.query(query, (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  create: (table, data, callback) => {
    const query = `INSERT INTO ${table} SET ?`;
    db.query(query, data, (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  findById: (table, id, callback) => {
    const query = `SELECT * FROM ${table} WHERE id = ?`;
    db.query(query, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },

  update: (table, id, data, callback) => {
    const fields = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(data), id];
    const query = `UPDATE ${table} SET ${fields} WHERE id = ?`;
    db.query(query, values, (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  // Fungsi untuk delete
  delete(table, id, callback) {
    const query = `DELETE FROM ${table} WHERE id = ?`;
    db.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results); // Kembalikan hasil query (contoh affectedRows)
    });
  },
};

module.exports = Database;
