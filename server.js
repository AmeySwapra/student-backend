import express from 'express';
import { connectDB } from './lib/prisma.js';
import authRoute from './routes/auth.route.js';
import studentRoute from './routes/student.route.js';
import userRoute from './routes/user.route.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

connectDB();

app.use(express.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const corsOptions = {
  origin: ['https://swapra-student-dashboard.netlify.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization'],  
};

app.use(cors(corsOptions));

app.use('/auth', authRoute);
app.use('/students', studentRoute);
app.use('/user', userRoute);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
