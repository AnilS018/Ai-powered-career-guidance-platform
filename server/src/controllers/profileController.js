const Profile = require('../models/Profile');
const User = require('../models/User');

// @desc    Get current student profile
// @route   GET /api/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id })
      .populate('user', 'fullName email role education college graduationYear')
      .populate('targetCareer');

    if (!profile) {
      // Auto-create initial profile if not found
      profile = await Profile.create({
        user: req.user.id,
        education: {
          college: req.user.college || '',
          degree: req.user.education || '',
          department: 'Computer Science',
          graduationYear: req.user.graduationYear || new Date().getFullYear(),
          cgpa: '8.0',
        },
        careerInterests: ['Artificial Intelligence', 'Software Development'],
        technicalSkills: [
          { name: 'Python', level: 'Intermediate', proficiency: 65 },
          { name: 'SQL', level: 'Intermediate', proficiency: 60 },
          { name: 'Machine Learning', level: 'Beginner', proficiency: 45 },
        ],
        softSkills: ['Communication', 'Problem Solving', 'Teamwork'],
        preferredIndustries: ['IT', 'Finance', 'E-commerce'],
      });
      profile = await Profile.findById(profile._id).populate('user', 'fullName email role');
    }

    res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error('[Get Profile Error]', error);
    res.status(500).json({ success: false, message: 'Server error retrieving profile.' });
  }
};

// @desc    Update current student profile
// @route   PUT /api/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const {
      phone,
      location,
      bio,
      education,
      careerInterests,
      technicalSkills,
      softSkills,
      preferredIndustries,
      careerGoal,
      targetCareer,
      fullName,
      college,
      graduationYear,
    } = req.body;

    // Update user root fields if supplied
    if (fullName || college || graduationYear) {
      await User.findByIdAndUpdate(req.user.id, {
        ...(fullName && { fullName }),
        ...(college && { college }),
        ...(graduationYear && { graduationYear: Number(graduationYear) }),
      });
    }

    let profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      profile = new Profile({ user: req.user.id });
    }

    if (phone !== undefined) profile.phone = phone;
    if (location !== undefined) profile.location = location;
    if (bio !== undefined) profile.bio = bio;
    if (education !== undefined) profile.education = { ...profile.education, ...education };
    if (careerInterests !== undefined) profile.careerInterests = careerInterests;
    if (technicalSkills !== undefined) profile.technicalSkills = technicalSkills;
    if (softSkills !== undefined) profile.softSkills = softSkills;
    if (preferredIndustries !== undefined) profile.preferredIndustries = preferredIndustries;
    if (careerGoal !== undefined) profile.careerGoal = careerGoal;
    if (targetCareer !== undefined) profile.targetCareer = targetCareer;

    await profile.save();

    const updatedProfile = await Profile.findById(profile._id)
      .populate('user', 'fullName email role education college graduationYear')
      .populate('targetCareer');

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      profile: updatedProfile,
    });
  } catch (error) {
    console.error('[Update Profile Error]', error);
    res.status(500).json({ success: false, message: 'Server error updating profile.' });
  }
};
