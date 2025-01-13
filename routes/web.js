const express = require("express");
const router = express.Router();
const IndexController = require("../app/Http/Controllers/IndexController.js");
const ApiMobile = require("../app/Http/Controllers/ApiMobileController.js");
const Storage = require("../app/Http/Providers/storage.js");

// Rute untuk update
router.post(
  "/update/:id",
  Storage.upload.single("image"),
  IndexController.update
);
router.get("/create", IndexController.create);
router.post("/store", Storage.upload.single("image"), IndexController.store);
router.get("/api", ApiMobile.index);
router.get("/", IndexController.index);
router.get("/edit/:id", IndexController.show);
module.exports = router;
