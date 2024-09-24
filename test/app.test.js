const { expect } = require('chai')
const app = require('../server')
const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')
const User = require('../models/user')

// Add in mock user data above the before hook
const mockUserData = [
    {
      name: "Jane Doe",
      email: "janeDoe@mail.com",
      password: "password123",
      phoneNumber: "1234567890",
    },
];

//before tests are run
before((done) => {
    //connect to the db
    mongoose.connect(process.env.MONGODB_URI)
    mongoose.connection.once("open", async () => {
        try{
            await User.create(mockUserData)
            done()
        }catch(err){
            done(err)
        }
    })
})

// put tests here

//after tests are run
after((done) => {
    //disconnect from the db
    app.close(() => {
        mongoose.connection.db.dropDatabase(()=>{
            mongoose.connection.close()
        })
    })
    done()
})