


import React, { useState } from 'react';
import axios from 'axios';
import styles from './Chatbot.module.css';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    // initialize gemini api
    const genAI = new GoogleGenerativeAI("AIzaSyBWVwZMz8CnyN2QHsEbFheQv1rDocykHwo");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const sendMessage = async () => {
        if (input.trim()) {
            const newMessage = { text: input, sender: 'user' };
            try {
                const result = await model.generateContent(input);
                const response = await result.response;
                console.log(response);
                setMessages((prev) => [
                    ...prev,
                    { sender: "user", text: input },
                    { sender: "bot", text: response.text() }
                ]);
            } catch (error) {
                console.error('Error sending message', error);
            }

            setInput('');
        }
    };

    return (
        <div className={styles.chatContainer}>
            {/* <div className={styles.dateHeader}>24 October, Sunday</div> */}
            <h2>Let's Chat</h2>
            <div className={styles.chatWindow}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={message.sender === 'user' ? styles.userMessage : styles.botMessage}
                    >
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>

            <div className={styles.inputContainer}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className={styles.input}
                />
                <button onClick={sendMessage} className={styles.sendButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M2 21l21-9L2 3v7l15 2-15 2z" fill="#fff" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
