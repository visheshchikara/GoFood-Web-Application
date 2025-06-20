// src/components/Chatbot/Chatbot.js
import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import ChatMessage from './ChatMessage';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you with your food order today?", sender: "bot" }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (input.trim() === '') return;

        // Add user message to chat
        const userMessage = { text: input, sender: 'user' };
        setMessages([...messages, userMessage]);
        setInput('');

        try {
            // Send message to backend
            const response = await fetch('http://localhost:5000/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();

            // Add bot response to chat
            setTimeout(() => {
                setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
            }, 500); // Small delay to make it feel more natural

        } catch (error) {
            console.error('Error sending message to chatbot:', error);
            // Add error message
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    text: "Sorry, I'm having trouble connecting right now. Please try again later.",
                    sender: 'bot'
                }]);
            }, 500);
        }
    };

    return (
        <div className="chatbot-container">
            {/* Chatbot toggle button */}
            <button
                className="chatbot-toggle"
                onClick={toggleChatbot}
            >
                {isOpen ? '✕' : '💬'}
            </button>

            {/* Chatbot dialog */}
            {isOpen && (
                <div className="chatbot-box">
                    <div className="chatbot-header">
                        <h3>GoFood Support</h3>
                    </div>
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <ChatMessage key={index} message={msg} />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <form className="chatbot-input-form" onSubmit={handleSend}>
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Type your message..."
                            className="chatbot-input"
                        />
                        <button type="submit" className="chatbot-send-btn">Send</button>
                    </form>
                </div>
            )}
        </div>
    );
}