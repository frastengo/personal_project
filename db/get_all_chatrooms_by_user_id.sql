select * from chatrooms
join users on users.user_id = chatrooms.user_2
where user_1 = $1;