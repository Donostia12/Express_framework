const { db } = require("./server");
const { encrypt, verify } = require("./hash"); // Pastikan untuk mengimpor fungsi hash

let session = {};

const Auth = {
  async login(email, password) {
    try {
      db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, results) => {
          if (err) {
            console.error(err);
            return { success: false, message: "Database error" };
          }

          if (results.length === 0) {
            return console.log({
              success: false,
              message: "Invalid email or password",
            });
          }

          const user = results[0];

          // Compare hashed password
          const match = await verify(password, user.password);
          if (!match) {
            return console.log({
              success: false,
              message: "Invalid email or password",
            });
          }

          session.user = user; // Simpan user di session
          console.log({ success: true, message: "Login successful", user });
        }
      );
    } catch (error) {
      console.error(error);
      return { success: false, message: "Unexpected error" };
    }
  },

  user(field = null) {
    if (!session.user) {
      return null;
    }

    return field ? session.user[field] : session.user;
  },

  logout() {
    session = {}; // Hapus session
    return { success: true, message: "Logged out successfully" };
  },
};

module.exports = Auth;
