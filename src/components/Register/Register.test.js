const {initDb} = require("../../../server/test/init");
const sinon = require("sinon");
const rC = require("./FunctionsRegister");
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
        rC.submit(db, {
            email: 'frastengo@gmail.com',
            password: '1234',
            user_name: 'Francisca'
        }).then(newUser => {
            console.log(newUser)
            expect(newUser.length).not.toEqual(0);
            expect(newUser[0]).toMatchObject({
              email: expect.any(String),
              password: expect.any(String),
              user_name: expect.any(String),
            });
        })
    })
  })
  


})

