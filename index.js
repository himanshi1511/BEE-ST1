import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config";



const app = express();

app.use(express.json());

app.use(cors());

app.get('/' , (request , response)=>{
    console.log(request)
    return response.status(234).send('Welcome to MERN Stack Tutorial');
});



