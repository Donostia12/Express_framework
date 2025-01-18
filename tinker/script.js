const { hash } = require("bcrypt");
const Auth = require("../config/auth");
const Hash = require("../config/Hash");
Auth.login("test@gmail.com", "123");

setTimeout(() => {
  console.log(Auth.user("email"));
}, 1000);

setTimeout(() => {
  console.log(Auth.logout());
}, 2000);

setTimeout(() => {
  console.log(Auth.user("email"));
}, 3000);

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
