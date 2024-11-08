const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");
const validateUser = require("../middleware/validateUser");
const router = new express.Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: 
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: mostafa
 *               email:
 *                 type: string
 *                 example: manga9721@gmail.com
 *               password:
 *                 type: string
 *                 example: testTest@1
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: mostafa
 *                     email:
 *                       type: string
 *                       example: manga9721@gmail.com
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzJlNzA5YmQ0ZGM0MGFiODc1NjBlMmUiLCJpYXQiOjE3MzEwOTY3MzF9.B0CpKQ-tg3NJ3fLTJDfv7mLqsZHoQVy3Zz_xcLmXQ1I
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               invalidEmailFormat:
 *                 summary: Invalid email format
 *                 value:
 *                   error: Invalid email format.
 *               emailAlreadyInUse:
 *                 summary: Email already in use
 *                 value:
 *                   error: Email already in use.
 *               weakPassword:
 *                 summary: Weak password
 *                 value:
 *                   error: Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An unexpected error occurred.
 */
router.post("/users", validateUser, async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (e) {
    console.error("Signup error:", e);

    if (e.name === "ValidationError") {
      const messages = Object.values(e.errors).map((err) => err.message);
      return res.status(400).send({ error: messages.join(", ") });
    } else if (e.code === 11000) {
      return res.status(400).send({ error: "Email already in use." });
    }

    return res.status(500).send({ error: "An unexpected error occurred." });
  }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user
 *     tags: 
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: manga9721@gmail.com
 *               password:
 *                 type: string
 *                 example: testTest@1
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: mostafa
 *                     email:
 *                       type: string
 *                       example: manga9721@gmail.com
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInRJfaWQiOiI2NzJlNzA5YmQ0ZGM0MGFiODc1NjBlMmUiLCJpYXQiOjE3MzEwOTY3MzF9.B0CpKQ-tg3NJ3fLTJDfv7mLqsZHoQVy3Zz_xcLmXQ1I
 *       400:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid email or password.
 */
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (e) {
    console.error("Login error:", e);
    return res.status(400).send({ error: "Invalid email or password." });
  }
});

module.exports = router;