const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes");
const mongo = require("./mongo");
const cors = require("cors");
const passport = require('passport');
require("dotenv").config();

const OIDCBearerStrategy = require('passport-azure-ad').BearerStrategy;

const creds = {
  identityMetadata: `https://login.microsoftonline.com/${process.env.AAD_TENANT_ID}/v2.0/.well-known/openid-configuration`,
  clientID: process.env.AAD_CLIENT_ID,
  validateIssuer: true,
  passReqToCallback: false,
  issuer: process.env.AAD_ISSUER,
  audience: process.env.AAD_AUDIENCE,
  allowMultiAudiencesInToken: false,
  loggingLevel:'info',
  scope: ['crud']
};


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(passport.initialize());
const strategy = new OIDCBearerStrategy(creds, function(token, done) {
  console.log(token, 'was the token retreived');
  if (!token.oid)
      done(new Error('oid is not found in token'));
  else {
      owner = token.oid;
      done(null, token);
  }
});
passport.use(strategy);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const port = process.env.SERVER_PORT || 8000;
app.use("/", router);

app.listen(port, () => {
  console.log(`⚡App is running on port ${port}⚡`);
});
