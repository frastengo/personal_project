select * 
from profiles
where user_id = $1
order by profile_id asc;