// index.js
async function fetchAccessToken() {
    const fetch = await import('node-fetch');
    
    const url = 'https://demo-accounts.vivapayments.com/connect/token';
    const clientId = 'mrcwua00rtifb1yhpp642uxv6e1p7828ddk2x1fpw3hv4.apps.vivapayments.com';
    const clientSecret = 'TBAx90NW0e06vSU8521WjJw05001VN';

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`
    };

    const body = new URLSearchParams({
        'grant_type': 'client_credentials'
    });

    try {
        const response = await fetch.default(url, {
            method: 'POST',
            headers: headers,
            body: body
        });

        if (response.ok) {
            const data = await response.json();
            return data.access_token;
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error_description);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

async function createOrder(accessToken, orderData) {
    const url = 'https://demo-api.vivapayments.com/checkout/v2/orders';

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error_description || errorData.message);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { fetchAccessToken, createOrder };
