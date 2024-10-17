import express from "express";
import multer from 'multer';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from 'mongoose';
import {registerValidator, loginValidator, postCreateValidation} from './validations/auth.js';
import { validationResult } from 'express-validator';
import UserModel from './models/user.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/postController.js"
import handleValidationErrors from './utils/handleValidationError.js'
import cors from 'cors';
const app = express();

mongoose.connect('mongodb+srv://nick:donetsk2@cluster0.cjmncrr.mongodb.net/blog')
        .then(()=>console.log('we have connect with our data of base'))
        .catch((err)=>console.log('we have error with our connection', err));

app.get("/", (req,res)=>{
    res.send('hello')
})

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));


const storage = multer.diskStorage( {
    destination: (_, __, cb) =>{
cb(null, 'uploads');
    },

filename:  (_, file, cb) =>{
    cb(null, file.originalname);
        },

});

const upload = multer({
    storage
});

app.post('/upload', checkAuth ,upload.single('image') , (req,res)=>{
    res.json({
        url:`/uploads/ ${req.file.originalname}`,
    })
});

app.post('/auth/login', loginValidator ,  handleValidationErrors , UserController.login);

app.post('/auth/register', registerValidator , handleValidationErrors , UserController.register);


app.get('/auth/me', checkAuth , UserController.getMe);

app.post('/posts', checkAuth ,postCreateValidation, handleValidationErrors , PostController.create);
app.get('/posts', PostController.getAll );
app.get('/posts/:id', PostController.getOne);
app.delete('/posts/:id', checkAuth ,PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation ,  handleValidationErrors ,PostController.update);
app.listen(4444,(err)=>{
    if(err){
        return console.log(err);
    }
    console.log('server Ok');
});