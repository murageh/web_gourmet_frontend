'use client';

import {ToastContainer} from 'react-toastify';
import React from 'react';

import 'react-toastify/dist/ReactToastify.min.css';

const WithToastContainer = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={'colored'}
            />
        </>
    );
};

export default WithToastContainer;