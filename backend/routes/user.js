const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const Users = require("../models/Users");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Samreenisagoodgir@l";
const user_middleware = require("../middleware/user_middleware");

router.post(
    "/registerUser",
    [
        body("name").not().isEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Please enter a valid email"),
        body("password"),
        body("companyName").not().isEmpty().withMessage("Company name is required"),
        body("address").not().isEmpty().withMessage("Address is required"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password, companyName, address, company_logo } = req.body;
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
                company_logo
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

            // Sign JWT token
            jwt.sign(
                payload,
                JWT_SECRET,
                { expiresIn: "1h" },
                (err, token) => {
                    if (err) throw err;

                    // Exclude sensitive data (like password) from the user object
                    const { password, ...userData } = user._doc;  // _doc is used to access the raw MongoDB document

                    // Respond with the token and the user data
                    res.json({
                        token,
                        user: userData,
                        msg: "Login successful"
                    });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

router.get("/getUserInfo", user_middleware, async (req, res) => {
    try {
        const user = await Users.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.get("/getAllUsers", async (req, res) => {
    try {
        const users = await Users.find().select("-password");
        if (!users || users.length === 0) {
            return res.status(404).json({ msg: "No users found" });
        }
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;