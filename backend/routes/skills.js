const express = require('express');
const router = express.Router();
const Skill = require('../models/skills');
const User = require('../models/User');

router.post('/add', async(req, res)=>{
    try {
        const { userId, name, type } = req.body;

        const skill = new Skill(req.body);
        await skill.save();
        // Update user's teachSkills or learnSkills array
try {
  if (type === "teach") {
    await User.findByIdAndUpdate(userId, { $addToSet: { teachSkills: name } });
  } else if (type === "learn") {
    await User.findByIdAndUpdate(userId, { $addToSet: { learnSkills: name } });
  }
} catch (err) {
  console.error("❌ Failed to update user's skill array", err);
}
        res.status(201).json(skill);
    } catch(err){
        res.status(500).json({error:'Something went wrong'});
    }
});

router.get('/:userId', async (req, res) => {
    try {
      const skills = await Skill.find({ userId: req.params.userId });
      res.json(skills);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  // Delete a skill by ID
router.delete('/delete/:id', async (req, res) => {
    try {
      const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
      if (!deletedSkill) {
        return res.status(404).json({ error: 'Skill not found' });
      }
      res.status(200).json({ message: 'Skill deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete skill' });
    }
  });

  // Update a skill by ID
router.put('/update/:id', async (req, res) => {
    try {
      const updatedSkill = await Skill.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          type: req.body.type,
          description: req.body.description,
          experience: req.body.experience,
        },
        { new: true }
      );
  
      if (!updatedSkill) {
        return res.status(404).json({ error: 'Skill not found' });
      }
  
      res.status(200).json(updatedSkill);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update skill' });
    }
  });
  
  

  
  
  module.exports = router;