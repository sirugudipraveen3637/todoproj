const sdk = require("node-appwrite");
const { v4: uuidv4 } = require("uuid");
const mongoose=require("mongoose");

const createawuser = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(201).send("all fields are required");
    } else {
      // Init SDK
      const client = new sdk.Client();
      client
        .setEndpoint(process.env.ENDPOINT) // Your API Endpoint
        .setProject(process.env.PROJECTID) // Your project ID
        .setKey(process.env.PROJECTKEY); // Your secret API key

      const users = new sdk.Users(client);
      const userId = uuidv4();
      const promise = users.createBcryptUser(userId, email, password);
      promise.then(
        function (response) {
          console.log(response);
          res.status(200).json({
            response: true,
            email: email,
            message: "user created successfully",
          });
        },
        function (error) {
          console.log(error);
          res.status(200).json({
            response: false,
            message: "user creation failed",
          });
        }
      );
    }
  } catch (error) {
    res.status(201).send("user creation using appwrite failed");
  }
};

module.exports = createawuser;
