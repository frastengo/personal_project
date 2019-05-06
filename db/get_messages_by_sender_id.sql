select * from messages
join users on users.user_id = messages.sender_id
where sender_id = 1;