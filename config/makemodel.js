const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const modelName = args[0];

if (!modelName) {
  console.error("Please provide a model name. Example: npm run model:news");
  process.exit(1);
}

const modelFileName = `${
  modelName.charAt(0).toUpperCase() + modelName.slice(1)
}.js`;
const modelFilePath = path.join(__dirname, "../app/Model", modelFileName);

const template = `// models/${modelName.toLowerCase()}.js
const Database = require("../../config/database");

const ${modelName.charAt(0).toUpperCase() + modelName.slice(1)} = {
  table: "${modelName.charAt(0).toUpperCase() + modelName.slice(1)}",
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

module.exports = ${modelName.charAt(0).toUpperCase() + modelName.slice(1)};
`;

fs.writeFile(modelFilePath, template, (err) => {
  if (err) {
    console.error("Error creating model file:", err);
    process.exit(1);
  }
  console.log(`Model file created: ${modelFilePath}`);
});
