const about = require("app/Model/About");
const path = require("path");
const fs = require("fs");

exports.show = (req, res) => {
  about.findById(1, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server Error");
    }
    if (!results) {
      return res.status(404).send("About not found");
    }
    res.render("about/show", { title: "About", results });
  });
};
