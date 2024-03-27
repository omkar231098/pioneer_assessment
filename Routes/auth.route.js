
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
 *     summary: Sample route to return a hello message.
 *     tags: [Sample]
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
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */


