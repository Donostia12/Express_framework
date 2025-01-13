const { db } = require("../../config/server");

const table = "News";

const News = {
  getAll: (callback) => {
    const query = "SELECT * FROM " + table;
    db.query(query, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  create: (data, callback) => {
    const query = "INSERT INTO " + table + " SET ?";
    db.query(query, data, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  // Contoh fungsi tambahan (misalnya mencari user berdasarkan ID)
  findById: (id, callback) => {
    const query = "SELECT * FROM " + table + " WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  },
  update: (id, data, callback) => {
    const { title, desc, short_desc, created_at, image } = data;

    const query =
      `UPDATE ` +
      table +
      ` SET title = ?, \`desc\` = ?, short_desc = ?, created_at = ?, image = ? WHERE id = ?`;

    db.query(
      query,
      [title, desc, short_desc, created_at, image, id],
      (err, results) => {
        if (err) {
          console.error("Error executing query:", err); // Debug error
          return callback(err, null);
        }
        callback(null, results);
      }
    );
  },
};

module.exports = News;
