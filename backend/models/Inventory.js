const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    reorderLevel: {
        type: Number,
        required: true
    },
    expiryDate: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
