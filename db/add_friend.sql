insert into friends (logged_id, profile_id)
values ($1, $2);

select * from friends
join profiles on profiles.user_id = friends.profile_id
where profiles.user_id = $2;