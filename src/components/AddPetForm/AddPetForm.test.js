const {initDb} = require("../../../server/test/init");
const sinon = require("sinon");
const aC = require("./FunctionsAddPetForm");
const axios = require("axios");

describe("integration test", () => {
  let db;

  beforeAll(() => {
    return initDb().then(theDb => {
      return (db = theDb);
    });
  });
  
  describe("submit (create new user) function", () => {

    it('should send new user to db', () => {
        // console.log(db)
        aC.addProfile(db, {
            user_id: 1,
            name: 'Batman',
            breed: 'Pitbull',
            gender: 'Male',
            age: '7 months old',
            favorites: 'Mom',
            image: 'url',
            country: 'United States',
            city: "Phoenix",
            state: "Arizona",
            zipcode: 12345
        }).then(newProfile => {
            console.log(newProfile)
            expect(newProfile.length).not.toEqual(0);
            expect(newProfile[0]).toMatchObject({
                user_id: expect.any(Number),
                name: expect.any(String),
                breed: expect.any(String),
                gender: expect.any(String),
                age: expect.any(String),
                favorites: expect.any(String),
                image: expect.any(String),
                country: expect.any(String),
                city: expect.any(String),
                state: expect.any(String),
                zipcode: expect.any(Number)
            });
        })
    })
  })
  


})

