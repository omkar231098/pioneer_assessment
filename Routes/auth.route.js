
const express = require("express");


const auth = express.Router();


const { login, register ,logout,gethello} = require("../Controllers/auth.controller");

const {authenticate}=require("../middlewares/authenticator")

auth.use(express.json());

// Define routes with associated controller methods
auth.post("/register" , register); // User registration
auth.post("/login", login); // User login
auth.post("/logout", logout); // User logout
auth.get("/gethello",authenticate,gethello); // User logout



module.exports = { auth };



/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user.
 *           example: johndoe
 *         password:
 *           type: string
 *           description: The password of the user.
 *           example: password123
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the request was successful.
 *           example: false
 *         message:
 *           type: string
 *           description: Error message.
 *           example: User not found
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: Registration successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Registration successful! You can now log in.
 *       '400':
 *         description: User already exists.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in with username and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Successfully logged in
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       '400':
 *         description: Incorrect password or user not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Failed to login.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out the user and blacklist the token.
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: Logged out successfully.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Logged out successfully
 *       '500':
 *         description: Server error.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Server error
 */


/**
 * @swagger
 * /gethello:
 *   get:
 *     summary: Sample route to return a hello message (protected route).
 *     tags: 
 *       - Sample
 *     security:
 *       - bearerAuth: []  # Indicates that the endpoint requires a bearer token
 *     responses:
 *       '200':
 *         description: Hello message returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello, World!
 *       '401':
 *         description: Unauthorized. Missing, invalid, or expired token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: JWT token obtained after successful login
 *         required: true
 *         schema:
 *           type: string
 *           format: bearer
 *           example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */

/**
 * @swagger
 * /alldata:
 *   get:
 *     summary: Fetch all data from the public API.
 *     tags: [API]
 *     responses:
 *       '200':
 *         description: Data fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/APIResponse'
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /filterdata:
 *   get:
 *     summary: Fetch filtered data from the public API based on category and limit.
 *     tags: [API]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           description: Category to filter the data.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           description: Number of entries to limit the response to.
 *     responses:
 *       '200':
 *         description: Filtered data fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/APIResponse'
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     APIResponse:
 *       type: object
 *       properties:
 *         count:
 *           type: integer
 *           example: 5
 *           description: Number of entries returned.
 *         entries:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/APIEntry'
 *     APIEntry:
 *       type: object
 *       properties:
 *         API:
 *           type: string
 *           description: The name of the API.
 *           example: arcsecond.io
 *         Description:
 *           type: string
 *           description: Description of the API.
 *           example: Multiple astronomy data sources
 *         Auth:
 *           type: string
 *           description: Authentication type for the API.
 *           example: ''
 *         HTTPS:
 *           type: boolean
 *           description: Indicates if the API supports HTTPS.
 *           example: true
 *         Cors:
 *           type: string
 *           description: Cross-Origin Resource Sharing (CORS) policy of the API.
 *           example: unknown
 *         Link:
 *           type: string
 *           description: Link to the API documentation or website.
 *           example: https://api.arcsecond.io/
 *         Category:
 *           type: string
 *           description: Category of the API.
 *           example: Science & Math
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the request was successful.
 *           example: false
 *         message:
 *           type: string
 *           description: Error message.
 *           example: User not found
 */
