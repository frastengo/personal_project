INSERT INTO users (email, password, user_name)
VALUES ($1, $2, $3)
RETURNING *;
