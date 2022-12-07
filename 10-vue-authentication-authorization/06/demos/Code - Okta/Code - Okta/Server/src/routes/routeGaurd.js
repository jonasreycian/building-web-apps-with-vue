const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: `https://${process.env.OKTA_DOMAIN}/oauth2/default`,
  clientId: process.env.OKTA_CLIENT_ID
});

const oAuthGaurd = async function (req, res, next) {
  try {    
    if (!req.headers.authorization) {
      throw new Error("Bearer token missing");
    }
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    
    oktaJwtVerifier.verifyAccessToken(token, 'api://users')
      .then( jwt => next() )
      .catch( err => {
        console.log(err);
        throw new Error("Invalid token") 
      });
    
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: "Authorization required!" });
  }
};

module.exports = oAuthGaurd;