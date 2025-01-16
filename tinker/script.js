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

// Enkripsi password
const password = "mySecretPassword";

setTimeout(() => {
  Hash.encrypt("123").then((result) => {
    console.log(result);
  });
}, 2000);

setTimeout(() => {
  Hash.verify(
    "123",
    "$2b$05$GmMsSS17el6djEw3sZDL4OPRgVGh8aKLVeBm2JCozAy.rhKVTG5/i"
  ).then((result) => {
    console.log(result);
  });
}, 3000);
