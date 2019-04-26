insert into profiles (user_id, name, breed, gender, age, favorites, image, country, city, state, zipcode)
values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
returning *;

