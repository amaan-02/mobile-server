
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload'); 

// Public Routes
router.post('/register', upload, userController.register); // Use upload middleware here
router.post('/login', userController.login);

// Protected Route (requires authentication)
router.get('/profile', authMiddleware, userController.profile);

module.exports = router;





