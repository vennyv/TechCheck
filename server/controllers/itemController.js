// server/controllers/itemsController.js

const db = require('../config/db');

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM items ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get item by ID
exports.getItemById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const result = await db.query('SELECT * FROM items WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new item
exports.createItem = async (req, res) => {
  const { title, text, image_url, submitted_by } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO items (title, text, image_url, submitted_by) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, text, image_url, submitted_by]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing item
exports.updateItem = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, text, image_url, submitted_by } = req.body;
  try {
    const result = await db.query(
      'UPDATE items SET title = $1, text = $2, image_url = $3, submitted_by = $4 WHERE id = $5 RETURNING *',
      [title, text, image_url, submitted_by, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const result = await db.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
