const express = require("express");
const https = require('node:https');
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.sName;
  const imejl = req.body.email;
  const data = {
    members: [
      {
      email_address : imejl,
      status : "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/3f7c494319";
  const options = {
    method: "POST",
    auth: "Nemanja:7cb9afd1364116b60dbfccdcf2e33447-us14"
  }
  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/succes.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();


})


app.post("/failure", function(req, res) {
  res.redirect("/");
});








app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});

// APIKEY
// 7cb9afd1364116b60dbfccdcf2e33447-us14

// audience ID
// 3f7c494319
