const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(process.env.CLIENT_ID);

const googlelogin = async (req, res) => {
  const { tokenId } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload.sub;
    console.log(payload, userId);

    jwt.sign(
      payload,
      process.env.JWT_SECRET_ID,
      { expiresIn: 600000 },
      (err, endoded) => {
        if (err) throw err;
        res.json(endoded);
      }
    );
  } catch (error) {
    console.error(error);
    res.sendStatus(401);
  }
};

module.exports = googlelogin;
