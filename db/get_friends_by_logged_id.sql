select * from friends
join profiles on profiles.profile_id = friends.profile_id
where friends.logged_id = $1;