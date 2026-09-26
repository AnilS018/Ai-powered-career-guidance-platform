const express = require('express');
const router = express.Router();
const { getCareers, getCareerById, recommendCareers, getSkillGap } = require('../controllers/careerController');
const { protect } = require('../middleware/auth');

router.get('/', getCareers);
router.post('/recommend', protect, recommendCareers);
router.get('/skill-gap', protect, getSkillGap);
router.get('/:id', getCareerById);

module.exports = router;
