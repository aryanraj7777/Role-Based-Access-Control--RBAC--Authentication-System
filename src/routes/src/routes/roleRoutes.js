const express = require('express');
const { createRole } = require('../controllers/roleController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticate, authorize(['Admin']), createRole);

module.exports = router;
