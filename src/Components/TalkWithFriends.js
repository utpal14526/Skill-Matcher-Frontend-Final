import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { Link } from 'react-router-dom'

export default function TalkWithFriends() {


    const [friends, setFriends] = useState([]);

    const host = "http://localhost:5000";

    const fetchProfiles = async () => {


        const response = await fetch(`${host}/api/fetchallfriends`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
        });

        const res = await response.json();
        console.log(res);
        setFriends(res.allfriends);
    }

    useEffect(() => {

        fetchProfiles();
    }, [])

    return (
        <Layout>

            <div className='profile-container1 d-flex'>


                {
                    friends.map((ele, index) => {
                        return <div className='notify-block' key={index}>
                            <span>{ele.of.username}</span>
                            <Link to={`/chat/${ele.of._id}`}><span>Chat</span></Link>
                        </div>
                    })
                }

            </div>


        </Layout>
    )
}
