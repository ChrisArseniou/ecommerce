// server.js
const express = require('express');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = 3000;

const { fetchAccessToken, createOrder } = require('./GetToken/index.js');

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.post('/getAccessToken', async (req, res) => {
    try {
        console.log(`Server is running on port ${PORT}`);

        //const { fetchAccessToken } = await import('./GetToken/index.js');

        const accessToken = await fetchAccessToken();
        res.json({ access_token: accessToken });
        console.log(`access_token is  ${accessToken}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/createOrder', async (req, res) => {
    const orderData = req.body;

    try {
        const accessToken = await fetchAccessToken();
        const orderResponse = await createOrder(accessToken, orderData);
        res.json(orderResponse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
