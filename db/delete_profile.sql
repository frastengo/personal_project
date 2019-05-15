delete from profiles
where profile_id = $1;

select * from profiles;