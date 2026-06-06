const { pool } = require("./pool");

async function getMessages() {
  try {
    const { rows } =
      await pool.query(`SELECT messages.message, messages.title, messages.time,
        members.first_name, members.last_name
        FROM messages JOIN members ON members.id = messages.user_id
        ORDER BY messages.time DESC;`);
    return rows;
  } catch (err) {
    console.log(err);
    return err;
  }
}

module.exports = { getMessages };
