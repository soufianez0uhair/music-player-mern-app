import {configureStore} from '@reduxjs/toolkit';

import tracksReducer from './tracksSlice';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        tracks: tracksReducer,
        auth: authReducer
    }
})