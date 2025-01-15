const mysql = require("mysql");

const db = mysql.createConnection({
  host: "192.168.1.5",
  user: "root",
  password: "",
  database: "apibaligatra",
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
