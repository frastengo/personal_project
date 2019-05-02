delete from friends
where logged_id = $1
and profile_id = $2;

select * from friends
join profiles on profiles.user_id = friends.profile_id
where profiles.user_id = $1; 