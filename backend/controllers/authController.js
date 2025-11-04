import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// ✅ Signup Controller
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Optional role assignment during signup
    const role = email === 'prateekshetty@gmail.com' ? 'admin' : 'user';

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully', role });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Something went wrong during signup' });
  }
};

// ✅ Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ✅ Determine role from DB (if schema includes it)
    const role = user.role === 'admin' ? 'admin' : 'user';

    return res.status(200).json({
      message: 'Login successful',
      role
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Something went wrong during login' });
  }
};
