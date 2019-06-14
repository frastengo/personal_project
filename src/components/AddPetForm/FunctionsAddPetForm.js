
module.exports = {
  addProfile(db, newProfile) {
    console.log(newProfile)
    
    return db.query(
      "INSERT INTO profiles(user_id, name, breed, gender, age, favorites, image, country, city, state, zipcode) VALUES (${user_id}, ${name}, ${breed}, ${gender}, ${age}, ${favorites}, ${image}, ${country}, ${city}, ${state}, ${zipcode} ) RETURNING *",
      {
        user_id: newProfile.user_id,
        name: newProfile.name,
        breed: newProfile.breed,
        gender: newProfile.gender,
        age: newProfile.age,
        favorites: newProfile.favorites,
        image: newProfile.image,
        country: newProfile.country,
        city: newProfile.city,
        state: newProfile.state,
        zipcode: newProfile.zipcode
      }
    );
  },

}
