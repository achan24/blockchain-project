const express = require('express');
const router = express.Router();

// Import mock data
const { user, nfts } = require('../data/mockData');

// Dashboard route - will require Web3 authentication later
router.get('/dashboard', (req, res) => {
  res.render('users/dashboard', { 
    title: 'User Dashboard',
    pageTitle: 'Your Rental Dashboard',
    user: user
  });
});

// Profile route
router.get('/profile', (req, res) => {
  res.render('users/profile', { 
    title: 'User Profile',
    pageTitle: 'Your Profile',
    user: user
  });
});

// Trust NFTs route
router.get('/trust-nfts', (req, res) => {
  res.render('users/trust-nfts', { 
    title: 'Your Trust NFTs',
    pageTitle: 'Your Trust NFTs Collection',
    nfts: nfts
  });
});

module.exports = router;
