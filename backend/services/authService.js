const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

exports.signup = async (data) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = new User({
    name: data.name,
    email: data.email,
    password: hashedPassword
    // ✅ role default "user" hoga — User model mein set hai
  });

  await user.save();

  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

exports.login = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ email });

  // ✅ Security — attacker ko pata na chale user exists karta hai ya nahi
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ApiError(400, "Invalid email or password");
  }

  // ✅ role add kiya + expiry add ki
  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role  // ✅ frontend ko role pata chalega
    }
  };
};