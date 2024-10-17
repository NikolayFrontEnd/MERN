/*  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios';
export const fetchPost = createAsyncThunk('posts/fetchPosts', async ()=>{
const { data } = await axios.get('/posts');
return data;
 });

const initialSate = {
    posts: {
        item:[],
        status:'loading',
    },
tags:{
    item:[],
    status:'loading',
},
};

const postSlice = createSlice({
name: 'posts',
initialSate,
reducers:{},
});
export const postReducer = postSlice.reducer;  */

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';
export const fetchPost = createAsyncThunk('posts/fetchPost', async ()=> {
    const { data } = await axios.get('/posts');
    return data;
}); 
const initialState = {
    posts: {
        item:[],
        status:'loading',
    },
tags:{
    item:[],
    status:'loading',
},
};


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchPost.pending] : (state) =>{
            state.posts.items = [];
            state.posts.status = 'loading';

        },
        [fetchPost.fulfilled] : (state,action) =>{
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPost.rejected] : (state) =>{
            state.posts.items = [];
            state.posts.status = 'error';
        },
    }
    });
    export const postReducer = postSlice.reducer; 