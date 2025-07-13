const Inventory = require('../models/Inventory');

exports.getItems = async (req, res) => {
    const items = await Inventory.find({ user: req.user });
    res.json(items);
};

exports.addItem = async (req, res) => {
    const { name, quantity, reorderLevel, expiryDate } = req.body;
    const item = await Inventory.create({ name, quantity, reorderLevel, expiryDate, user: req.user });
    res.json(item);
};

exports.deleteItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Inventory.findOneAndDelete({ _id: id, user: req.user });
        if (!deleted) {
            return res.status(404).json({ msg: 'Inventory item not found or unauthorized!' });
        }

        res.json({ msg: 'Inventory item deleted successfully.' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error during deletion.' });
    }
};

