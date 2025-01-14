const mysql = require("mysql");

const db = mysql.createConnection({
  host: "192.168.1.3",
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
