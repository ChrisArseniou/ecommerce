async function createOrder() {
    const url = 'http://localhost:3000/createOrder'; // Change this URL if your server is running on a different port

    // const orderData = {
    //     "amount": 1000,
    //     "customerTrns": "Short description of purchased items/services to display to your customer",
    //     "customer": {
    //         "email": "johdoe@vivawallet.com",
    //         "fullName": "John Doe",
    //         "phone": "+30999999999",
    //         "countryCode": "GB",
    //         "requestLang": "en-GB"
    //     },
    //     "paymentTimeout": 300,
    //     "preauth": false,
    //     "allowRecurring": false,
    //     "maxInstallments": 12,
    //     "paymentNotification": true,
    //     "tipAmount": 100,
    //     "disableExactAmount": false,
    //     "disableCash": true,
    //     "disableWallet": true,
    //     "sourceCode": "4791",
    //     "merchantTrns": "Short description of items/services purchased by customer",
    //     "tags": [
    //         "tags for grouping and filtering the transactions",
    //         "this tag can be searched on VivaWallet sales dashboard",
    //         "Sample tag 1",
    //         "Sample tag 2",
    //         "Another string"
    //     ]
    // };

    const orderData = {
        "amount": 10,
        "customerTrns": "Short description of purchased items/services to display to your customer",
        "customer": {
            "email": "",
            "fullName": "",
            "phone": "",
            "countryCode": "GR",
            "requestLang": "en-GB"
        },
        "paymentTimeout": 300,
        "preauth": false,
        "allowRecurring": false,
        "maxInstallments": 12,
        "paymentNotification": true,
        "tipAmount": 10,
        "disableExactAmount": false,
        "disableCash": true,
        "disableWallet": true,
        "sourceCode": "4791",
        "merchantTrns": "Short description of items/services purchased by customer",
        "tags": [
            "tags for grouping and filtering the transactions",
            "this tag can be searched on VivaWallet sales dashboard",
            "Sample tag 1",
            "Sample tag 2",
            "Another string"
        ]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            const data = await response.json();
            const orderCode = data.orderCode;
            const checkoutUrl = `https://demo.vivapayments.com/web/checkout?ref=${orderCode}`;
            window.location.href = checkoutUrl; // Redirect to checkout page
        } else {
            const errorData = await response.json();
            document.getElementById('response').innerText = 'Error: ' + JSON.stringify(errorData, null, 2);
        }
    } catch (error) {
        document.getElementById('response').innerText = 'Error: ' + error.message;
    }
}

document.getElementById('createOrderBtn').addEventListener('click', createOrder);
