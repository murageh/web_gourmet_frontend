'use client';

import {ToastContainer} from 'react-toastify';
import React from 'react';

import 'react-toastify/dist/ReactToastify.min.css';

/**
 * This component wraps the children in a toastable container, in that you can show toast notifications.
 * @param children
 * @constructor
 */
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