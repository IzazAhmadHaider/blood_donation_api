const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/api/user/login', userController.login);
router.post('/api/user/register/',  userController.registerUser);
router.get('/api/user/profile', verifyToken, userController.getUserProfile);
router.put('/api/user/updateProfile', verifyToken, userController.updateUserProfile);

module.exports = router;
