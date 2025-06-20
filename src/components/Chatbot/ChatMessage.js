// src/components/Chatbot/ChatMessage.js
import React from 'react';

export default function ChatMessage({ message }) {
    return (
        <div className={`chat-message ${message.sender}`}>
            <div className="message-content">
                {message.text}
            </div>
        </div>
    );
}