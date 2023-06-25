import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import dotenv from 'dotenv';
import ProductRoute from './routes/ProductRoute.js';

dotenv.config();

const app = express();

// Middleware || Endpoint
app.use(cors());
app.use(express.json());
app.use(ProductRoute);

// Konfigurasi koneksi database
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
};

// Membuat koneksi database
const connection = mysql.createConnection(dbConfig);

// Menghubungkan ke database
connection.connect((err) => {
    if (err) {
        console.error('Koneksi ke database gagal:', err);
    } else {
        console.log('Koneksi ke database berhasil!');
        // Melanjutkan dengan operasi lain setelah koneksi berhasil
        app.listen(process.env.APP_PORT, () => {
            console.log('Server berhasil berjalan....');
        });
    }
});

// Jika terjadi error pada koneksi database
connection.on('error', (err) => {
    console.error('Error pada koneksi database:', err);
});

process.on('SIGINT', () => {
    connection.end();
    process.exit();
});