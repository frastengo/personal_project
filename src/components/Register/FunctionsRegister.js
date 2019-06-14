
module.exports = {
  submit(db, newUser) {
    console.log(newUser)
    return db.query(
      "INSERT INTO users(email, password, user_name) VALUES (${email}, ${password}, ${user_name}) RETURNING *",
      {
        email: newUser.email,
        password: newUser.password,
        user_name: newUser.user_name
      }
    );
  },

}
