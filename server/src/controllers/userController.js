import User from "../models/User.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Simple email and password validation
    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the hashed password
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.json({ user });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Simple email and password validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { register, login };
