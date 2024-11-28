const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require('../utils/jwt');
const bcrypt = require('bcrypt');

// Register user
exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const userRole = await Role.findOne({ name: role });
        if (!userRole) return res.status(400).json({ message: 'Invalid role' });

        const user = new User({ username, email, password, role: userRole._id });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed', error: err.message });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).populate('role');
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.generateToken({ id: user._id, role: user.role.name });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};
