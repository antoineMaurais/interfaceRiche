import React, {useEffect, useRef, useState} from "react";
import {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardFooter
} from "mdb-react-ui-kit";

import "./StyleChat.css"
const StyleChat = ({ username }) => {
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
        <MDBCard id="chat2" style={{ height: "90vh", borderRadius: "15px" }}>
            <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
                <h5 className="mb-0">Chat</h5>
            </MDBCardHeader>
            <MDBCardBody style={{ maxHeight: "80vh", overflowY: "auto" }}>
                {/* Message extérieur */}
                {
                    [...messages].sort((a, b) => a.when - b.when).map((message, index) => (
                        message.name === "Sylvain"
                            ?
                             // Message intérieur
                            <div className="d-flex flex-row justify-content-end mb-4 pt-1" key={index}>
                                <div>
                                    <p className="small p-2 ms-3 mb-1 rounded-3">
                                        {message.name}
                                    </p>
                                    <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                        { message.message}
                                    </p>
                                </div>
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                                    alt="avatar 1"
                                    style={{ width: "45px", height: "100%" }}
                                />
                            </div>
                            :
                            <div className="d-flex flex-row justify-content-start" key={index}>
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                                    alt="avatar 1"
                                    style={{ width: "45px", height: "100%" }}
                                />
                                <div>
                                    <p className="small p-2 ms-3 mb-1 rounded-3">
                                        {message.name}
                                    </p>

                                    <p className="small p-2 ms-3 mb-1 rounded-3" style={{ backgroundColor: "#f5f6f7" }}>
                                        {message.message}
                                    </p>
                                </div>
                            </div>
                ))}


            </MDBCardBody>

            <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
                <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                    alt="avatar 3"
                    style={{ width: "45px", height: "100%" }}
                />
                <input
                    type="text"
                    className="form-control form-control-lg"
                    id="exampleFormControlInput1"
                    placeholder="Type message"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            submitMessage(e.target.value);
                            e.target.value = '';
                        }
                    }}
                />

            </MDBCardFooter>
        </MDBCard>
    );
}
export default StyleChat