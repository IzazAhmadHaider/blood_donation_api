const express = require('express');
const router = express.Router();
const createRequestController = require('../controllers/createRequestController')


router.post('/api/createRequest',createRequestController.createRequest)
router.get('/api/viewRequest',createRequestController.viewRequest)

module.exports=router