update profiles
set name = $1,
set breed = $2,
set gender = $3,
set image = $4,
set favorites = $5,
set country = $6,
set city = $7,
set state = $8,
set zipcode = $9
where profile_id = $10;

select * from profiles;