import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import incidentReportRoute from './routes/incidentReport.route.js';
import parkingRegisterRoute from './routes/parkingRegister.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Database Connected');
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('server is running on port 3000!');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/incidentReport', incidentReportRoute);
app.use('/api/parkingRegister', parkingRegisterRoute);
app.use('/api/comment', commentRoutes);

//Middleware to handle the errors more effectively
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
