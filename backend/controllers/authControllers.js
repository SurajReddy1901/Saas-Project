const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { email, password } = req.body;
    const exists = await User.findOne({ email })
    if (exists) {
        return res.status(400).json({ msg: 'User Exists!' })
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
        email,
        password: hash
    })
    res.json({ message: 'User Registered!' });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const hashPassword = await bcrypt.compare(password, user.password);
    if (!user || !hashPassword) {
        return res.status(400).json({ msg: 'Invalid credentials!' })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({ token })
};
