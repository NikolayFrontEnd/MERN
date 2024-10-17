import {configureStore} from '@reduxjs/toolkit';
import {postReducer} from './slices/post';
import {authReducer} from './slices/auth';
const store = configureStore({
    reducer: {
        posts: postReducer,
        auth: authReducer,
    },
    devTools:true
});

export default store;
