const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../Model/blacklist.model");
const { UserModel } = require("../Model/user.model");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header is provided
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization token is missing" });
    }

    // Check if the Authorization header is in the expected format (Bearer token)
    const [bearer, token] = authHeader.split(" ");
    if (!bearer || !token || bearer.toLowerCase() !== "bearer") {
      return res.status(401).json({ message: "Invalid Authorization header format" });
    }

    // Checking for blacklisted token
    const isBlacklisted = await BlacklistModel.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).send("Token is blacklisted");
    }

    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const { id } = decodedToken;

    // Check if the user exists
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Attach the user to the request object
    req.user = user;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    } else {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = { authenticate };
