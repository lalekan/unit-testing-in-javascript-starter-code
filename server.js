const express = require('express');
const app = express();
const User = require('./models/user');

app.use(express.json());

const add = (param1, param2) => {
    // Check if both parameters are numbers
    if (typeof param1 === "number" && typeof param2 === "number") {
      // Both are numbers, so add them
      return param1 + param2;
    }
  
    //Check is both parameters are strings
    if (typeof param1 === "string" && typeof param2 === "string") {
      // Both are strings, so concatenate them
      return param1 + param2;
    }
  
    // TODO: Write logic that accounts for parameters that are different data types
    if (typeof param1 != typeof param2 ) {
        
        return "Invalid input";
      }
    // If no specified condition is met, return a default value or an error message
    return "Invalid input";
};

const unitTestExampleTwo = () => {

    console.log('Test 2: Adding two different data types ("Hello " and 1)');
    console.log(add("Hello ", 1) === "Invalid input" ? "Passed" : "Failed");
};
unitTestExampleTwo();


app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json({ user });
    } catch (error) {
        res.json({ error: error.message });
    }
});

const server = app.listen(3000, () => {
    console.log('The express app is ready!');
});

module.exports = server;