const { hash } = require("bcrypt");
const Auth = require("../config/auth");
const Hash = require("../config/hash");
Auth.login("test@gmail.com", "123");

const password = "mySecretPassword";

setTimeout(() => {
  Hash.encrypt("123").then((result) => {
    console.log(result);
  });
}, 2000);
setTimeout(() => {
  Hash.encrypt("123").then((result) => {
    console.log(result);
  });
}, 2001);
setTimeout(() => {
  Hash.encrypt("123").then((result) => {
    console.log(result);
  });
}, 2500);
setTimeout(() => {
  Hash.verify(
    "123",
    "$2b$05$VaMAXHhQh7SUPOIPMlKke.5RB265OZhtiahTzGzTgX359GrjhMjJy"
  ).then((result) => {
    console.log(result);
  });
}, 2500);
