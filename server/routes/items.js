const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

// GET all items
router.get('/', itemsController.getAllItems);

// GET single item by ID
router.get('/:id', itemsController.getItemById);

// POST create a new item
router.post('/', itemsController.createItem);

// PUT update an existing item
router.put('/:id', itemsController.updateItem);

// DELETE an item
router.delete('/:id', itemsController.deleteItem);

module.exports = router;
