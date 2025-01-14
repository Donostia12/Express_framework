const Product = require("../../Model/Product");

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
