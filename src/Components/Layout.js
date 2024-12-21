import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout(props) {
    return (
        <div>

            <Navbar />
            <main style={{ minHeight: '80vh' }}>
                <ToastContainer />
                {props.children}
            </main>
            <Footer />
        </div>

    )
}
