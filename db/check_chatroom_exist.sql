select * from chatrooms
where (user_1 = $1 and user_2 = $2) or (user_1 = $2 and user_2 = $1);