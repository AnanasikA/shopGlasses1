const express = require('express');
const { createOrder, getOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/autchMiddleware');
const router = express.Router();

router.route('/')
    .post(protect, createOrder);
router.route('/:id')
    .get(protect, getOrder);

module.exports = router;