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


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});