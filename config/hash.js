const bcrypt = require("bcrypt");

const saltRounds = 5; // Jumlah salt rounds, semakin tinggi semakin aman, tapi lebih lama

const encrypt = async (text) => {
  try {
    const hashed = await bcrypt.hash(text, saltRounds);
    return hashed;
  } catch (error) {
    console.error("Error while hashing:", error);
  }
};

const verify = async (text, hashedText) => {
  try {
    const match = await bcrypt.compare(text, hashedText);
    return match;
  } catch (error) {
    console.error("Error while comparing:", error);
  }
};

module.exports = {
  encrypt,
  verify,
};
