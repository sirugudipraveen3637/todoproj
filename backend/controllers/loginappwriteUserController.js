const sdk = require("node-appwrite");
const mongoose=require("mongoose");

const loginaw = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(201).send("All fields are required");
    } else {
      // Init SDK
      const client = new sdk.Client();
      client
      .setEndpoint(process.env.ENDPOINT) // Your API Endpoint
      .setProject(process.env.PROJECTID) // Your project ID
      .setKey(process.env.PROJECTKEY); // Your secret API key

      const users = new sdk.Users(client);
      const promise = users.list();

      promise.then(
        function (response) {
          //console.log(response);
          var userlogin = "false";
          for (const user of response.users) {
            if (user.email === email && user.password === password) {
              userlogin = "true";
              console.log("success");
              break;
            }
          }
          if (userlogin === "true") {
            res.status(200).send("login success");
          } else {
            res.status(200).send("login failed");
          }
        },
        function (error) {
          console.log(error);
          res.status(201).send("user list failed");
        }
      );
    }
  } catch (error) {
    res.status(201).send("login with appwrite failed");
  }
};

module.exports = loginaw;
