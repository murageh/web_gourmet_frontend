'use client';

import React from 'react';
import {persistor, store} from '@/state/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

/**
 * This component renders its children with the redux store
 * This is useful for client components that need to access the redux store.
 */

export const WithRedux = ({children}: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
};