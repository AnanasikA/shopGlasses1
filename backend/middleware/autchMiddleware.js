import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {
    
    const authHeader = req.headers['authorization'];
    
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided or wrong format' });
    }

    
    const token = authHeader.split(' ')[1];

    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        
        req.userId = decoded.id;
        next();
    });
};

export default authMiddleware;

