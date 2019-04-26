select * 
from profiles
join users on profiles.user_id = users.user_id
where profile_id = 1;