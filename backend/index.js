import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ProductRoute from './routes/ProductRoute.js'
dotenv.config()

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(ProductRoute);

// tempat berjalan server
app.listen(process.env.APP_PORT, () => {
    console.log('server berhasil jalan....');
});