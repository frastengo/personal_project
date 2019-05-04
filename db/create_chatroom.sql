insert into chatrooms(user_1, user_2)
values($1,$2)
returning *;