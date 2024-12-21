import React, { useEffect } from 'react'
import Layout from './Layout'
import { useNavigate } from 'react-router-dom';

export default function PrimaryHome() {

    const navigate = useNavigate();

    useEffect(() => {

        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
        else {
            navigate('/serachfriend');
        }

    }, []);


    return (
        <>

            <Layout>

                <div>
                    <h1>HII</h1>
                </div>



            </Layout>
        </>
    )
}
