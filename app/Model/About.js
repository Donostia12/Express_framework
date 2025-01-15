// models/about.js
const Database = require("../../config/database");

const About = {
  table: "about",
  fillable: [],

  getAll(callback) {
    Database.getAll(this.table, callback);
  },

  create(data, callback) {
    const filteredData = {};
    this.fillable.forEach((field) => {
      if (data[field] !== undefined) {
        filteredData[field] = data[field];
      }
    });
    Database.create(this.table, filteredData, callback);
  },

  findById(id, callback) {
    Database.findById(this.table, id, callback);
  },

  update(id, data, callback) {
    const filteredData = {};
    this.fillable.forEach((field) => {
      if (data[field] !== undefined) {
        filteredData[field] = data[field];
      }
    });
    Database.update(this.table, id, filteredData, callback);
  },

  delete(id, callback) {
    Database.delete(this.table, id, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.affectedRows === 0) {
        return callback(null, false); // Tidak ada baris yang dihapus
      }
      callback(null, results);
    });
  },
};

module.exports = About;
