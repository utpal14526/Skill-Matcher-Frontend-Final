import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';
let socket;

export default function TalkWithFriendsPage() {
    const { USERID } = useParams();

    const [currmessage, setCurrmessage] = useState("");
    const [allmessages, setAllmessages] = useState([]);
    const [socketConnected, setSocketConnected] = useState(false);

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('setup', { _id: localStorage.getItem('ID') });
        socket.on('connected', () => setSocketConnected(true));
        socket.on('message received', (newMessage) => {
            if (newMessage.sender === USERID || newMessage.receiver === localStorage.getItem('ID')) {
                setAllmessages((prevMessages) => [...prevMessages, newMessage]);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [USERID]);

    const handleChange = (e) => {
        setCurrmessage(e.target.value);
    };

    const host = 'http://localhost:5000';

    const fetchChats = async () => {
        const response = await fetch(`${host}/api/fetch-chat/${USERID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
        });

        const result = await response.json();
        setAllmessages(result.Chats);
        socket.emit('join chat', USERID);
    };

    useEffect(() => {
        fetchChats();
    }, [USERID]);

    const handleSend = async () => {
        const messageData = {
            content: currmessage,
            sender: localStorage.getItem('ID'),
            receiver: USERID,
            chat: { users: [localStorage.getItem('ID'), USERID] }
        };

        socket.emit('new message', messageData);
        setAllmessages([...allmessages, messageData]);

        const response = await fetch(`${host}/api/post-chat/${USERID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({ content: currmessage })
        });

        setCurrmessage("");
    };

    return (
        <Layout>

            <div className='form-outer-container'>
                <div className="form-container mt-5 profile-internal-container my-5" style={{ width: '600px' }}>
                    <h2>Chats</h2>
                    <div className="chat-messages">
                        {allmessages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender === localStorage.getItem('ID') ? 'message-right' : 'message-left'}`}>
                                <p>{msg.content}</p>
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your message"
                        value={currmessage}
                        onChange={handleChange}
                        style={{ borderRadius: '5px' }}
                    />
                    <button className='btn btn-primary' onClick={handleSend}>Send</button>
                </div>

            </div>
        </Layout>
    );
}
