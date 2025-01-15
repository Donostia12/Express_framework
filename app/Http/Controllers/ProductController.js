const Product = require("app/Model/Product");
const fs = require("fs");
const path = require("path");
exports.index = (req, res) => {
  Product.getAll((err, results) => {
    if (err) {
      console.error(err);
    }
    res.render("product/index", { title: "Halaman Utama", results });
  });
};

exports.create = (req, res) => {
  res.render("product/create", { title: "Buat Produk Baru" });
};

exports.store = (req, res) => {
  const { title, content_desc, short_desc, created_at } = req.body;
  const image = req.file ? req.file.filename : null;

  const newsData = {
    title,
    content_desc,
    short_desc,
    created_at,
    image,
  };

  Product.create(newsData, (err, results) => {
    if (err) {
      console.error("Error creating news:", err);
      return res.status(500).send("Server Error");
    }

    res.redirect("/product");
  });
};
exports.show = (req, res) => {
  const id = req.params.id;
  Product.findById(id, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
    if (!results) {
      return res.status(404).send("Product not found");
    }
    res.render("product/show", { title: "Detail Produk", results });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { title, content_desc, short_desc, created_at } = req.body;
  let image = req.body.oldImage;

  if (req.file) {
    image = req.file.filename;

    const oldImagePath = path.join(
      __dirname,
      "../../storage",
      req.body.oldImage
    );
    if (fs.existsSync(oldImagePath)) {
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error("Error deleting old image:", err);
      });
    }
  }

  Product.update(
    id,
    { title, content_desc, short_desc, created_at, image },
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Server Error");
      }
      if (!results) {
        return res.status(404).send("News not found");
      }

      res.redirect("/product");
    }
  );
};

exports.delete = (req, res) => {
  const { id } = req.params;
  Product.delete(id, (err, results) => {
    if (err) {
      console.error("Error deleting product:", err);
      return res.status(500).send("Server Error");
    }
    if (!results) {
      return res.status(404).send("Product not found");
    }
    res.redirect("/product");
  });
};
