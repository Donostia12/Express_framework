const Auth = require("../config/auth");

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
