const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController')


router.post('/api/ratingText',ratingController.ratingText)

module.exports=router