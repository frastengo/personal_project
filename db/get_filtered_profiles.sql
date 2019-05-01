select * from profiles
join users on profiles.user_id = users.user_id
where profiles.user_id != $1;