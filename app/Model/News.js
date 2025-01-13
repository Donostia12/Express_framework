// models/news.js
const Database = require("../../config/database");

const News = {
  table: "News",
  fillable: ["title", "content_desc", "short_desc", "created_at", "image"],

  getAll(callback) {
    Database.getAll(this.table, callback);
  },

  create(data, callback) {
    // Filter data berdasarkan fillable
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
    // Filter data berdasarkan fillable
    const filteredData = {};
    this.fillable.forEach((field) => {
      if (data[field] !== undefined) {
        filteredData[field] = data[field];
      }
    });
    Database.update(this.table, id, filteredData, callback);
  },
};

module.exports = News;
