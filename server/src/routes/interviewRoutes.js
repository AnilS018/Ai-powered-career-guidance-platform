const express = require('express');
const router = express.Router();
const { startInterview, submitAnswer, getInterviewHistory } = require('../controllers/interviewController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.post('/start', startInterview);
router.post('/answer', submitAnswer);
router.get('/history', getInterviewHistory);

module.exports = router;
