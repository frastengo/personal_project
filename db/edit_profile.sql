update profiles
set name = $2, breed = $3, gender = $4, age = $5, favorites = $6, image = $7, country = $8, city = $9, state = $10, zipcode = $11, user_id = $12
where profile_id = $1;

select * 
from profiles
where user_id = $12
order by profile_id asc;
