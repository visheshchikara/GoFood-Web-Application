// backend/Routes/Chatbot.js
const express = require('express');
const router = express.Router();

// Simple response templates for different query types
const responses = {
    greeting: [
        "Hello! How can I help you with your food order today?",
        "Hi there! Welcome to GoFood. What can I help you with?",
        "Welcome! How may I assist you with your order?"
    ],
    menu: [
        "You can check our full menu on the home page. We have various categories including Indian, Chinese, Italian, and more!",
        "Our menu features a variety of cuisines. You can filter by category on our home page."
    ],
    delivery: [
        "Delivery usually takes 30-45 minutes depending on your location and order volume.",
        "We typically deliver within 45 minutes of order confirmation."
    ],
    payment: [
        "We accept credit/debit cards, UPI, and cash on delivery.",
        "You can pay using cards, digital wallets, or cash on delivery."
    ],
    problem: [
        "I'm sorry to hear that. Please provide your order ID and specific issue, and we'll help resolve it.",
        "I apologize for the inconvenience. Could you share your order details so we can assist you better?"
    ],
    default: [
        "I'm not sure I understand. Could you rephrase or ask about our menu, delivery, payment options, or order status?",
        "I didn't quite catch that. Feel free to ask about our food, delivery times, payment methods, or any other queries about your order."
    ]
};

// Helper function to categorize the query
function categorizeQuery(message) {
    message = message.toLowerCase();

    if (message.match(/hello|hi|hey|greetings/)) {
        return 'greeting';
    } else if (message.match(/menu|food|dish|eat|cuisine|category/)) {
        return 'menu';
    } else if (message.match(/delivery|deliver|time|how long|when|arrive/)) {
        return 'delivery';
    } else if (message.match(/pay|payment|card|cash|upi|wallet/)) {
        return 'payment';
    } else if (message.match(/problem|issue|wrong|bad|error|mistake|refund|cancel/)) {
        return 'problem';
    } else {
        return 'default';
    }
}

// Function to get a random response from the category
function getResponse(category) {
    const responseList = responses[category] || responses.default;
    const randomIndex = Math.floor(Math.random() * responseList.length);
    return responseList[randomIndex];
}

// Chatbot endpoint
router.post('/chatbot', (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const category = categorizeQuery(message);
        const reply = getResponse(category);

        return res.json({ reply });
    } catch (error) {
        console.error('Chatbot error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;