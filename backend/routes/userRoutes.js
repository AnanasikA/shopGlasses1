const express = require('express');
const { registerUser, authUser } = require('../controllers/userController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Przykładowy middleware

// Użycie middleware dla określonej trasy
router.route('/register')
    .post(registerUser);

router.route('/login')
    .post(authUser);


router.use('/protected', authMiddleware, (req, res) => {
    res.send('Protected route');
});

module.exports = router;
