
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
 *         password:
 *           type: string
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Registration successful! You can now log in.
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: User already exists. Please use a different username.
 *     HelloMessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Hello, World!
 *   securitySchemes:
 *     BearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: Enter your Bearer token in the format "Bearer {token}"
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
 *               $ref: '#/components/schemas/SuccessResponse'
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
 * /auth/login:
 *   post:
 *     summary: Log in a user.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       '400':
 *         description: Incorrect password or invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Failed to login due to internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * /auth/logout:
 *   post:
 *     summary: Log out a user.
 *     tags: [Authentication]
 *     responses:
 *       '200':
 *         description: User logged out successfully.
 *       '500':
 *         description: Server error during logout.
 * /auth/gethello:
 *   get:
 *     summary: Get a hello message (protected route).
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Hello message retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HelloMessageResponse'
 *       '401':
 *         description: Unauthorized. Bearer token is missing or invalid.
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
 * /alldata:
 *   get:
 *     summary: Fetch data from a public API.
 *     tags: [DataFetch]
 *     responses:
 *       '200':
 *         description: Data fetched successfully.
 *       '500':
 *         description: Internal server error during data fetching.
 * /filterdata:
 *   get:
 *     summary: Fetch filtered data from a public API.
 *     tags: [DataFetch]
 *     parameters:
 *       - in: query
 *         name: category
 *         description: Category for filtering data.
 *         type: string
 *       - in: query
 *         name: limit
 *         description: Limit the number of entries.
 *         type: integer
 *         format: int32
 *     responses:
 *       '200':
 *         description: Filtered data fetched successfully.
 *         schema:
 *           type: object
 *           properties:
 *             count:
 *               type: integer
 *               example: 5
 *             entries:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Entry'
 *       '500':
 *         description: Internal server error during filtered data fetching.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Internal Server Error
 */
