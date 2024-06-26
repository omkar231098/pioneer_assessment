const getLogger = require('../Logger/logger')
const logger = getLogger('auth'); // Provide the route name, e.g., 'auth' for authentication routes
const { UserModel } = require('../Model/user.model');
const { BlacklistModel } = require("../Model/blacklist.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 // Import the validator functions
require('dotenv').config();


// Function to generate a JWT token for a user
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: '1d',
  });
};




// User registration route
const register = async (req, res) => {

  

  const { username, password } = req.body;

  try {
    // Check if the user with the given email already exists
    user = await UserModel.findOne({ username });

    if (user) {
      // Return an error if the user already exists
      return res.status(400).json({
        success: true,
        message: 'User already exists. Please use a different username.',
      });
    }

    // Hash the user's password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new user instance and save it to the database
    user = new UserModel({
        username,
        password: hashPassword,
    });

    await user.save();

    // Return success message after successful registration
    res.status(200).json({
      success: true,
      message: 'Registration successful! You can now log in.',
    });
  } catch (err) {
    // Handle server error if registration fails
    logger.error(`Registration failed: ${err}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// User login route
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await UserModel.findOne({ username });

    if (!user) {
      logger.error(`User not found for login attempt: ${username}`);
      return res.status(404).json({ status: false,message: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      logger.error(`Invalid credentials for user: ${username}`);
      return res.status(400).json({ status: false, message: 'Incorrect Password' });
    }

    const accessToken = generateToken(user);

  

    res.status(200).json({
      status: true,
      message: 'Successfully logged in',
      accessToken // Ensure alertMessage is sent
    });
  } catch (error) {
    logger.error(`Login failed: ${error}`);
    res.status(500).json({ status: false, message: 'Failed to login' });
  }
};

const logout = async (req, res) => {
  
  try {
    // Add token to blacklist collection
    const token = req.headers.authorization;
    const blacklistedToken = new BlacklistModel({ token });
    await blacklistedToken.save();

    res.status(200).send("Logged out successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }

}


const gethello= async (req, res) => {
  try {
    // Your logic here
    const message = 'Hello, World!';
    res.status(200).json({ message });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



module.exports = { register, login ,logout,gethello};
