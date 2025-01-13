const news = require("../../Model/News");

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

exports.index = (req, res) => {
  news.getAll((err, results) => {
    if (err) {
      console.error(err);
    }
    const news = results.map((item) => {
      return {
        title: item.title,
        short_desc: item.short_desc,
        desc: item.desc,
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