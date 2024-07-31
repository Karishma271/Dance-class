const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Contact = require('../models/Contact'); // Adjust path if needed

// Handle POST request to /submit
router.post('/submit', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('message', 'Message is required').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, message } = req.body;
  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(200).send('Contact saved successfully.');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error saving contact.');
  }
});

module.exports = router;
