import express from 'express';
import { registerUser, authUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/autchMiddleware.js'; // Przykładowy middleware

const router = express.Router();

// Użycie middleware dla określonej trasy
router.post('/register', registerUser);

router.post('/login', authUser);

router.use('/protected', authMiddleware, (req, res) => {
    res.send('Protected route');
});

export default router;