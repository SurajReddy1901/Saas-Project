const express = require('express');
const { getItems, addItem, deleteItem } = require('../controllers/inventoryController');
const protectAuth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protectAuth, getItems);
router.post('/', protectAuth, addItem);
router.delete('/:id', protectAuth, deleteItem);

module.exports = router;
