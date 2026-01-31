const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// লগইন করার রাস্তা (Route)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // ১. ইমেইল আছে কি না চেক করা
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "❌ ভুল ইমেইল বা পাসওয়ার্ড!" });
        }

        // ২. পাসওয়ার্ড মিলিয়ে দেখা
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "❌ ভুল ইমেইল বা পাসওয়ার্ড!" });
        }

        // ৩. সিকিউরিটি টোকেন তৈরি করা (Token)
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' } // ১ দিন পর টোকেন এক্সপায়ার হবে
        );

        // ৪. সফল হলে ইউজারের তথ্য পাঠানো
        res.json({
            message: "✅ লগইন সফল!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role, // এটা দিয়ে আমরা বুঝব কে মালিক আর কে পার্টনার
                walletBalance: user.walletBalance
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "সার্ভার এরর!" });
    }
});

module.exports = router;