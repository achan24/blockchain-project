const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
  res.render('index', { 
    title: 'BlockTrust Rental Service',
    pageTitle: 'Welcome to BlockTrust',
    description: 'Rent items using blockchain technology and build trust with NFTs'
  });
});

// About page route
router.get('/about', (req, res) => {
  res.render('about', { 
    title: 'About BlockTrust',
    pageTitle: 'About Our Service',
    description: 'Learn how our blockchain-based rental service works'
  });
});

// Contact page route
router.get('/contact', (req, res) => {
  res.render('contact', { 
    title: 'Contact Us',
    pageTitle: 'Get in Touch',
    description: 'Contact the BlockTrust team'
  });
});

module.exports = router;
