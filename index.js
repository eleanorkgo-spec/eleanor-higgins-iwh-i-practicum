const express = require('express');
const axios = require('axios');
const app = express();

// Load environment variables
require('dotenv').config();

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './views');

// HubSpot API setup
const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;

// TODO: Replace this with your actual custom object type ID (e.g., '2-12345678')
const CUSTOM_OBJECT_TYPE = '2-197531439';

// Routes will go below...
// Homepage route - displays all cookbook records
app.get('/', async (req, res) => {
    const customObjectsUrl = `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        // Get all records with their properties
        const response = await axios.get(customObjectsUrl, {
            headers,
            params: {
                properties: 'name,author,cuisine_focus'
            }
        });

        const records = response.data.results;
        res.render('homepage', { records });
    } catch (error) {
        console.error('Error fetching cookbooks:', error.response?.data || error.message);
        res.status(500).send('Error fetching data from HubSpot');
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});