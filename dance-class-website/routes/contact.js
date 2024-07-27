const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

router.post('/', (req, res) => {
  const { name, email, message } = req.body;
  // Here you can handle the form submission, e.g., send an email or store in a database
  console.log(`Contact Form Submission: Name=${name}, Email=${email}, Message=${message}`);
  res.redirect('/contact');
});

module.exports = router;
