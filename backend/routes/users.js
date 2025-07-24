const Skill = require('../models/skills');
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Update user profile
router.put('/update/:id', async (req, res) => {
  try {
    const { name, email, bio, linkedin, profilePic } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        bio,
        linkedin,
        profilePic
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

router.get('/', async(req, res)=>{
  try{
    const users = await User.find({}, '-password').lean();
    const allSkills = await Skill.find();

    const usersWithSkills = users.map(user => {
      const teachSkills = allSkills
        .filter(skill => skill.userId.toString() === user._id.toString() && skill.type === 'Teaching')
        .map(skill => skill.name);

      const learnSkills = allSkills
        .filter(skill => skill.userId.toString() === user._id.toString() && skill.type === 'Learning')
        .map(skill => skill.name);

      return {
        ...user,
        teachSkills,
        learnSkills
      };
    });

    res.json(usersWithSkills);
  } catch(error){
    console.error('Error fetching Users:', error);
    res.status(500).json({error: 'failed to fetch users'});
  }
});

module.exports = router;