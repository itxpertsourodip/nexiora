const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    try {
        // ১. ইমেইল ও পাসওয়ার্ড থেকে স্পেস (Space) সরিয়ে নেওয়া
        const email = req.body.email.trim();
        const password = req.body.password.trim();

        console.log("🔍 Login Attempt for:", email); // লগ ১

        // ২. ইমেইল আছে কি না চেক করা
        const user = await User.findOne({ email });
        
        if (!user) {
            console.log("❌ User Not Found in Database!"); // লগ ২
            return res.status(400).json({ message: "❌ ইমেইলটি ডাটাবেসে নেই!" });
        }

        console.log("✅ User Found:", user.email); // লগ ৩
        console.log("🔐 Stored Hash:", user.password); // লগ ৪

        // ৩. পাসওয়ার্ড মিলিয়ে দেখা
        const isMatch = await bcrypt.compare(password, user.password);
        
        console.log("🤔 Password Match Result:", isMatch); // লগ ৫ (True নাকি False)

        if (!isMatch) {
            console.log("❌ Password did not match!"); 
            return res.status(400).json({ message: "❌ পাসওয়ার্ড ভুল হয়েছে!" });
        }

        // ৪. টোকেন তৈরি
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' } 
        );

        res.json({
            message: "✅ লগইন সফল!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                walletBalance: user.walletBalance
            }
        });

    } catch (error) {
        console.error("🔥 Server Error:", error);
        res.status(500).json({ message: "সার্ভার এরর!" });
    }
});

module.exports = router;