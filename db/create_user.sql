INSERT INTO users (email, user_password, name)
VALUES ($1, $2, $3)
RETURNING *;
