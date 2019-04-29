select * from friends
join profiles on profiles.profile_id = friends.friend_id
where friends.logged_id = $1;