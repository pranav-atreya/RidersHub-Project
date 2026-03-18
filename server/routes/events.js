const router = require('express').Router();
const User = require('../models/User');


router.get('/:id/registrations', async (req, res) => {
  const eventId = req.params.id;

  try {
    const users = await User.find({ registeredEvents: eventId });

    const usernames = users.map(user => user.username);
    
    res.status(200).json(usernames);

  } catch (err) {
    console.error(err);
    res.status(500).json('Server error: ' + err.message);
  }
});

const verifyUser = (req, res, next) => {
  if (!req.body.userId) {
    return res.status(401).json("You're not logged in.");
  }
  next();
};

router.post('/:id/register', verifyUser, async (req, res) => {
  const eventId = req.params.id;
  const userId = req.body.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json('User not found.');
    }

    if (user.registeredEvents.includes(eventId)) {
      return res.status(400).json('You are already registered for this event.');
    }

    user.registeredEvents.push(eventId);
    const updatedUser = await user.save();

    res.status(200).json({ message: 'Successfully registered!', user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error: ' + err.message);
  }
});

module.exports = router;