const { pool } = require("./pool");
const bcrypt = require("bcryptjs");

async function addUser(username, name, password, member, admin) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await pool.query(
      `INSERT INTO members 
        (username, first_name, last_name, password, member, admin)
        VALUES ($1, $2, $3, $4, $5, $6);`,
      [username, name[0], name[1], hashedPassword, member, admin],
    );
  } catch (err) {
    console.log(err);
  }
}

async function addMessage(message, username, title) {
  try {
    await pool.query(
      `INSERT INTO messages
      (message, user_id, time, title) VALUES
      ($1, (SELECT id FROM members WHERE username = $2), NOW(), $3);`,
      [message, username, title],
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = { addUser, addMessage };
