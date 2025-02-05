const mysql = require("mysql");
require("dotenv").config();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE,
});
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to the database!");
  }
});

module.exports = {
  db,
  port: 3000, // Port server
};

// const mysql = require("mysql");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "devt5887_donospro",
//   password: "Donos@pro12",
//   database: "devt5887_baligatra",
// });
// db.connect((err) => {
//   if (err) {
//     console.error("Database connection failed:", err.message);
//   } else {
//     console.log("Connected to the database!");
//   }
// });

// module.exports = {
//   db,
//   port: 3000, // Port server
// };
