const express = require('express');
const router = express.Router();
const { getQuestions, submitAssessment, getResults } = require('../controllers/assessmentController');
const { protect } = require('../middleware/auth');

router.get('/', getQuestions);
router.post('/submit', protect, submitAssessment);
router.get('/results', protect, getResults);

module.exports = router;
