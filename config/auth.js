const { db } = require("./server");
const { verify } = require("./hash");

let session = {};

const Auth = {
  async login(email, password) {
    return new Promise((resolve, reject) => {
      try {
        db.query(
          "SELECT * FROM users WHERE email = ?",
          [email],
          async (err, results) => {
            if (err) {
              console.error(err);
              return reject({ success: false, message: "Database error" });
            }

            if (results.length === 0) {
              return resolve({
                success: false,
                message: "Invalid email or password",
              });
            }

            const user = results[0];

            // Compare hashed password
            const match = await verify(password, user.password);
            if (!match) {
              return resolve({
                success: false,
                message: "Invalid email or password",
              });
            }

            session.user = user; // Simpan user di session
            resolve({ success: true, message: "Login successful", user });
          }
        );
      } catch (error) {
        console.error(error);
        reject({ success: false, message: "Unexpected error" });
      }
    });
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
