const express = require('express');
const router = express.Router();

// Import mock data
const { items } = require('../data/mockData');

// Get all items
router.get('/', (req, res) => {
  res.render('items/index', { 
    title: 'Available Items',
    pageTitle: 'Items Available for Rent',
    items: items
  });
});

// Get single item details
router.get('/:id', (req, res) => {
  const item = items.find(item => item.id === parseInt(req.params.id));
  
  if (!item) {
    return res.status(404).render('error', { 
      title: 'Item Not Found',
      message: 'The requested item does not exist',
      error: {}
    });
  }
  
  res.render('items/details', { 
    title: item.name,
    pageTitle: `Rent ${item.name}`,
    item: item
  });
});

// Rent an item (this will be connected to blockchain later)
router.post('/:id/rent', (req, res) => {
  const item = items.find(item => item.id === parseInt(req.params.id));
  
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }
  
  if (!item.available) {
    return res.status(400).json({ success: false, message: 'Item is not available for rent' });
  }
  
  // This is where we would interact with the blockchain
  // For now, just mark the item as unavailable
  item.available = false;
  
  res.json({ success: true, message: `You have successfully rented the ${item.name}` });
});

// Return an item (this will be connected to blockchain later)
router.post('/:id/return', (req, res) => {
  const item = items.find(item => item.id === parseInt(req.params.id));
  
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }
  
  if (item.available) {
    return res.status(400).json({ success: false, message: 'Item is not currently rented' });
  }
  
  // This is where we would interact with the blockchain
  // For now, just mark the item as available
  item.available = true;
  
  res.json({ success: true, message: `You have successfully returned the ${item.name}` });
});

module.exports = router;
