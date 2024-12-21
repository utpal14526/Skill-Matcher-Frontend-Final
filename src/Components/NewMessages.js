
import React, { useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SeenMessages() {


    const [seenmessages, setSeenmessages] = useState([]);

    useEffect(() => {
        fetchnewmessages();
    }, []);

    const [countnotify, setcountnotify] = useState(0);


    const host = "http://localhost:5000";

    const fetchnewmessages = async () => {

        try {

            const response = await fetch(`${host}/api/new-messages`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });

            const json = await response.json();
            setSeenmessages(json.newmessages);
            setcountnotify(json.newmessages.length);

        }
        catch (error) {
            toast.error('Something Went Wrong');
        }
    }

    const handlemark = async () => {

        try {

            const response = await fetch(`${host}/api/markread`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
            });

            const json = await response.json();
            console.log(json);
            setSeenmessages([]);

            window.location.reload();

        }
        catch (error) {
            toast.error('Something Went Wrong');
        }

    }


    return (

        <>



            <button className='btn btn-primary mt-3 ml-2' onClick={handlemark}>Mark Read</button>

            {
                seenmessages.map((ele) => {
                    return <div className='notify-block'>
                        <span>{ele}</span>
                    </div>
                })

            }

        </>

    )
}
