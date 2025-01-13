const express = require("express");
const path = require("path");
const webRoutes = require("../routes/web");
const { db, port } = require("../config/server");
const fs = require("fs");

const app = express();

// Contoh query menggunakan koneksi database
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../resources/views"));
app.use("/storage", express.static(path.join(__dirname, "../storage")));

app.use("/", webRoutes);

// Jalankan server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
