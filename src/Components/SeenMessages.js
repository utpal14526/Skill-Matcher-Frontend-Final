
import React, { useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SeenMessages() {


    const [newmessages, setNewmessages] = useState([]);

    useEffect(() => {
        fetchnewmessages();
    }, []);


    const host = "http://localhost:5000";

    const fetchnewmessages = async () => {

        try {

            const response = await fetch(`${host}/api/seen-messages`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });

            const json = await response.json();
            setNewmessages(json.seenmessages);

        }
        catch (error) {
            toast.error('Something Went Wrong');
        }


    }


    return (

        <>

            {
                newmessages.map((ele) => {
                    return <div className='notify-block'>
                        <span>{ele}</span>
                    </div>
                })

            }

        </>

    )
}
