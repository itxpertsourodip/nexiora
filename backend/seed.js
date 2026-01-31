const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // ইউজার মডেল ইম্পোর্ট

dotenv.config();

// ইউজারদের তালিকা
const users = [
  {
    name: "Sourodip Dash Roy",
    email: "itxpertsourodip@gmail.com",
    password: "@Sourodip_009#", // পরে বদলাতে পারবেন
    role: "superadmin", // 👑 সব ক্ষমতার অধিকারী
    phone: "01738671739"
  },
  {
    name: "Amit Chanda",
    email: "chandaamit754@gmail.com",
    password: "amit_pass",
    role: "admin", // 🤝 পার্টনার (অর্ডার ও স্টক দেখবে)
    phone: "01321446989"
  },
  {
    name: "Partho Sen",
    email: "parthosensen@gmail.com",
    password: "partho_pass",
    role: "admin", // 🤝 পার্টনার
    phone: "01888467292"
  }
];

const seedDB = async () => {
  try {
    // ডাটাবেস কানেকশন
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Database Connected for Seeding...");

    // আগের কোনো ইউজার থাকলে মুছে ফেলবে (ডুপ্লিকেট এড়াতে)
    await User.deleteMany({});
    console.log("🧹 Old users removed.");

    // পাসওয়ার্ড এনক্রিপ্ট করে ইউজার তৈরি
    for (let user of users) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      
      await User.create({
        ...user,
        password: hashedPassword
      });
    }

    console.log("🎉 Sourodip, Amit, and Partho accounts created successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
};

seedDB();