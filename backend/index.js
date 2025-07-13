const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Load cron job for production 
// require('./jobs/inventoryAlerts');

const { checkAlerts } = require('./jobs/inventoryAlerts');
// checkAlerts()
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();
app.get('/test-alerts', async (req, res) => {
    await checkAlerts();
    res.send('🔁 Job tested. Check console for logs.');
});
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));
console.log('Email:', process.env.EMAIL_USER);
console.log('Password exists:', !!process.env.EMAIL_PASS);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
