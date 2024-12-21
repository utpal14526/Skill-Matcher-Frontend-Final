import React from 'react'
import Layout from './Layout'
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";
import OOPSIMAGE from '../Images/OOPs.png'

export default function PageNotFound() {
    return (

        <Layout>
            <div className='mt-3 pnf flex justify-content'>
                <img src={OOPSIMAGE} alt="Oops" className="pnf-image" />
                <h2 className='pnf-heading'>Something Went Wrong !</h2>
                <Link to='/' className='pnf-btn mt-2'><IoMdArrowRoundBack /> Go Back</Link>
            </div>
        </Layout>

    )
}
