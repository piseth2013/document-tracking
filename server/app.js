import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const CLIENT = 'http://localhost:5173';

const app = express();

// CORS & preflight
const corsOptions = {
  origin: CLIENT,
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// parse JSON & cookies
app.use(express.json());
app.use(cookieParser());

// connect to Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// routes
app.use('/api/users', userRoutes);

// catch-all 404
app.use((req, res) => {
  res.status(404).json({ message: `No route ${req.method} ${req.path}` });
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
