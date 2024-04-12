import {combineReducers, configureStore} from '@reduxjs/toolkit';
import responseSlice from '@/state/features/websitesSlice';
// redux-persist
import {persistReducer, persistStore} from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'web-gourmet-frontend',
    storage: localStorage,
    stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers({
    responses: responseSlice,
});

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred types
export type AppDispatch = typeof store.dispatch;