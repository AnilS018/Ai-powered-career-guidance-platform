const express = require('express');
const router = express.Router();
const { getLearningProgress, updateModuleProgress } = require('../controllers/learningController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.get('/', getLearningProgress);
router.post('/progress', updateModuleProgress);

module.exports = router;
