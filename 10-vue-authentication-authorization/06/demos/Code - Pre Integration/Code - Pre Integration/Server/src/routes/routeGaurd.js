const { OAuth2Client } = require("google-auth-library");
const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

const oAuthGaurd = async function (req, res, next) {
  try {
    
    if (!req.headers.authorization) {
      throw new Error("Bearer token missing");
    }
    const token = req.headers.authorization.split(" ")[1];
    const tokenInfo = await oAuth2Client.getTokenInfo(token);
    console.log(tokenInfo);
    if (tokenInfo && tokenInfo.scopes.length > 0) {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: "Authorization required!" });
  }
};

module.exports = oAuthGaurd;