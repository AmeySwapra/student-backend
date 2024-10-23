import express from 'express';
import { connectDB } from './lib/prisma.js';
import authRoute from './routes/auth.route.js'
import studentRoute from './routes/student.route.js'

const app = express();

connectDB();


app.use(express.json());


app.use('/auth', authRoute)
app.use('/students', studentRoute)


const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


