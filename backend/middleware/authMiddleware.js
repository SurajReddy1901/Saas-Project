const jwt = require('jsonwebtoken')

const protectAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ msg: 'No token provided!' });
    }
    const token = authHeader.startsWith('Bearer ')? authHeader.split(' ')[1]: authHeader;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    }
    catch {
        res.status(401).json({ msg: 'Invalid Token!' })
    }
};

module.exports = protectAuth;