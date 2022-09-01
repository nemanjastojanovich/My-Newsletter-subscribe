const client = require("mailchimp-marketing");
const express = require("express");

const https = require('node:https');

const bodyParser = require("body-parser");

const request = require("request");

const inspector = require('node:inspector');

const app = express();

client.setConfig({
  apiKey: "nemanja:7cb9afd1364116b60dbfccdcf2e33447-us14",
  server: "us14",
});

const run = async () => {
  const response = await client.root.getRoot();
  console.log(response);
};

run();
