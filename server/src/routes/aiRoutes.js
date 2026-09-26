const express = require('express');
const router = express.Router();
const {
  getAiCareerRecommendation,
  chatWithCounselor,
  getChatHistory,
  clearChatHistory,
  reviewResume,
} = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.post('/career-recommendation', getAiCareerRecommendation);
router.post('/chat', chatWithCounselor);
router.get('/chat/history', getChatHistory);
router.delete('/chat/history', clearChatHistory);
router.post('/resume-review', reviewResume);

module.exports = router;
