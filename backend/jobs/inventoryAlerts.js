const cron = require('node-cron');
const Inventory = require('../models/Inventory');
const User = require('../models/User');
const { sendAlertEmail } = require('../services/emailService'); // disable for now

const checkAlerts = async () => {
    console.log('🚨 Running checkAlerts Job');

    const users = await User.find();
    for (const user of users) {
        const items = await Inventory.find({ user: user._id });
        for (const item of items) {
            let send = false;
            let message = `Alert for ${item.name}:\n`;

            if (item.quantity <= item.reorderLevel) {
                message += `- Quantity low (${item.quantity} left)\n`;
                send = true;
            }

            if (
                item.expiryDate &&
                new Date(item.expiryDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            ) {
                message += `- Expiry approaching: ${item.expiryDate.toDateString()}\n`;
                send = true;
            }

            if (send) {
                console.log(`📦 Inventory Alert for ${user.email}:\n${message}`);
                await sendAlertEmail(user.email, 'Inventory Alert', message);
            }
        }
    }
};

// Runs daily at 8am
cron.schedule('0 8 * * *', checkAlerts, {
    timezone: 'Asia/Kolkata'
});
// cron.schedule('* * * * *', checkAlerts); // For debug/testing

module.exports = { checkAlerts };
