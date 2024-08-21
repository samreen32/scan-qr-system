const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Users = require("../models/Users");
const JWT_SECRET = "Samreenisagoodgir@l";
const jwt = require("jsonwebtoken");

/****** 1st Route: Register a User *******/
router.post(
    "/registerUser",
    [
        body("name").not().isEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Please enter a valid email"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
        body("companyName").not().isEmpty().withMessage("Company name is required"),
        body("address").not().isEmpty().withMessage("Address is required"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password, companyName, address } = req.body;
        try {
            let user = await Users.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: "User already exists" });
            }
            user = new Users({
                name,
                email,
                password,
                companyName,
                address,
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            const userData = await user.save();
            res.status(201).json({ userData, msg: "User registered successfully" });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

router.post(
    "/loginUser",
    [
        body("email").isEmail().withMessage("Please enter a valid email"),
        body("password").exists().withMessage("Password is required"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await Users.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }
            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                JWT_SECRET,
                { expiresIn: "1h" },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;