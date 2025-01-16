const { db } = require("./server");

let session = {}; // Simulasi session sederhana

const Auth = {
  async login(email, password) {
    try {
      db.query(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, password],
        (err, results) => {
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
      return null; // Jika user belum login
    }
    // Jika field ada, kembalikan field tersebut, jika tidak kembalikan seluruh user
    return field ? session.user[field] : session.user;
  },

  logout() {
    session = {}; // Hapus session
    return { success: true, message: "Logged out successfully" };
  },
};

module.exports = Auth;
