update users
set user_name = $2,
email = $3
where user_id = $1
returning *;