import React, { useState, useEffect, useRef } from 'react';

const ChatComponent = ({ username }) => {
    const [messages, setMessages] = useState([]);
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket('wss://imr3-react.herokuapp.com/');

        ws.current.onopen = () => {
            // console.log("connected");
        };

        ws.current.onmessage = (evt) => {
            // console.log("Message received: ", evt.data);
            const receivedMessages = JSON.parse(evt.data);
            setMessages((prevMessages) => [...prevMessages, ...receivedMessages]);
        };

        ws.current.onclose = () => {
            // console.log("disconnected, reconnect.");
            // // S'assurer de nettoyer la référence au WebSocket précédent
            // if (ws.current) {
            //     ws.current.close();
            // }
            // // Recréer une nouvelle instance WebSocket
            // ws.current = new WebSocket('wss://imr3-react.herokuapp.com');
        };

        // Cleanup on unmount
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    const submitMessage = (messageString) => {
        const message = { name: username, message: messageString };
        ws.current.send(JSON.stringify(message));
    };

    return (
        <div>
            <input
                type="text"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        submitMessage(e.target.value);
                        e.target.value = '';
                    }
                }}
            />
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message.name}: {message.message}</li>
                ))}
            </ul>

        </div>
    );
};

export default ChatComponent;
