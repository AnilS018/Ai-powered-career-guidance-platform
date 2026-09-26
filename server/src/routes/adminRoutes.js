const express = require('express');
const router = express.Router();
const {
  getUsers,
  updateUser,
  deleteUser,
  getAnalytics,
  createCareer,
  updateCareer,
  deleteCareer,
  createQuestion,
  deleteQuestion,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('ADMIN'));

router.get('/users', getUsers);
router.route('/users/:id').put(updateUser).delete(deleteUser);
router.get('/analytics', getAnalytics);

router.post('/careers', createCareer);
router.route('/careers/:id').put(updateCareer).delete(deleteCareer);

router.post('/assessments', createQuestion);
router.delete('/assessments/:id', deleteQuestion);

module.exports = router;
