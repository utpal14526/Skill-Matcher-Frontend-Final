import { React, useState, useEffect } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import Layout from './Layout';
import NewMessages from './NewMessages';
import SeenMessages from './SeenMessages';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Notification() {
    const [newmessages, setNewmessages] = useState([]);


    useEffect(() => {
        fetchnewmessages();
    }, []);

    const host = "http://localhost:5000";

    const fetchnewmessages = async () => {


        try {
            const response = await fetch(`${host}/api/getCount`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });

            const json = await response.json();
            setNewmessages(json.length);
        } catch (error) {
            toast.error('Something Went Wrong');
        }
    }


    return (
        <Layout>
            <div className='notify-container'>
                <div style={{ width: '500px', height: '700px' }} className="form-container mt-1 profile-internal-container my-5">
                    <div style={{ width: '100%', height: '20px' }} className='notify-header '>
                        <NavLink className="nav-link" to="newnotifications" activeClassName="active-link">
                            <span>New Messages</span>
                            {newmessages > 0 && (
                                <span className="notification-count">{newmessages}</span>
                            )}
                        </NavLink>
                        <NavLink className="nav-link" to="seennotifications" activeClassName="active-link">
                            <span>Seen Messages</span>
                        </NavLink>
                    </div>
                    <div className="content ">
                        <Routes>
                            <Route path="newnotifications" element={<NewMessages />} />
                            <Route path="seennotifications" element={<SeenMessages />} />
                            <Route path="/" element={<NewMessages />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
