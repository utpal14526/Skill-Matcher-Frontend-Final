import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Spinner() {

    const navigate = useNavigate();
    const location = useLocation();

    const [count, seCount] = useState(3);



    useEffect(() => {

        const interval = setInterval(() => {
            seCount((prevValue) => --prevValue)
        }, 1000)

        count === 0 && navigate('/login',
            {
                state: location.pathname
            }
        );

        return () => clearInterval(interval);

    }, [count, navigate])


    return (
        <>
            <div className="spinner-border text-primary d-flex justify-content-center align-items-center" role="status">

            </div>
            <h1 className="text-center">Redirecting to you in {count}</h1>
        </>
    )
}
