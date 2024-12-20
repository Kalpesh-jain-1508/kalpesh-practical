import express from 'express';
import { config } from 'dotenv';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import userRoute from "./Routes/User/userRoute.js";
import bookRoute from "./Routes/Book/bookRoute.js";
import ErrorMiddelware from './Middlewares/error.js';

const app = express();

config({
    path: "./config/config.env",
});

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const URL = process.env.NODE_ENV === "production" ? process.env.LIVE_FRONTEND_URL : process.env.FRTONEND_URL;

app.use(
    cors({
        origin: [
            URL,
            'http://localhost:3000'
        ],
        credentials: true,
        methods: ['get', 'post', 'put', 'patch', 'delete'],
    })
);

app.use('/api/v1', userRoute);
app.use('/api/v1', bookRoute);

export default app;

// Using Custom Error Middelware
app.use(ErrorMiddelware);