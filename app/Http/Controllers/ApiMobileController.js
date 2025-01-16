const news = require("../../Model/News");
const Product = require("../../Model/Product");
const service = require("../../Model/Service");
const portfolio = require("../../Model/Portfolio");
const about = require("../../Model/About");

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("id-ID", options);
}

exports.news = (req, res) => {
  news.getAll((err, results) => {
    if (err) {
      console.error(err);
    }
    const news = results.map((item) => {
      return {
        title: item.title,
        short_desc: item.short_desc,
        desc: item.content_desc,
        image: item.image,
        created_at: formatDate(item.created_at),
      };
    });
    return res.status(200).json({
      success: true,
      data: news,
    });
  });
};
exports.service = (req, res) => {
  service.getAll((err, results) => {
    if (err) {
      console.error(err);
    }
    const news = results.map((item) => {
      return {
        title: item.title,
        short_desc: item.short_desc,
        desc: item.content_desc,
        image: item.image,
        created_at: formatDate(item.created_at),
      };
    });
    return res.status(200).json({
      success: true,
      data: news,
    });
  });
};
exports.Product = (req, res) => {
  Product.getAll((err, results) => {
    if (err) {
      console.error(err);
    }
    const news = results.map((item) => {
      return {
        title: item.title,
        short_desc: item.short_desc,
        desc: item.content_desc,
        image: item.image,
        created_at: formatDate(item.created_at),
      };
    });
    return res.status(200).json({
      success: true,
      data: news,
    });
  });
};

exports.portofolio = (req, res) => {
  portfolio.getAll((err, results) => {
    if (err) {
      console.error(err);
    }
    const news = results.map((item) => {
      return {
        title: item.title,
        image: item.image,
        created_at: formatDate(item.created_at),
      };
    });
    return res.status(200).json({
      success: true,
      data: news,
    });
  });
};
exports.about = (req, res) => {
  about.getAll((err, results) => {
    if (err) {
      console.error(err);
    }
    const news = results.map((item) => {
      return {
        short_desc: item.short_desc,
        content_desc: item.content_desc,
        image: item.image,
        created_at: formatDate(item.created_at),
      };
    });
    return res.status(200).json({
      success: true,
      data: news,
    });
  });
};
