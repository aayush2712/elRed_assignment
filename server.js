const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');
const user = require('./Users/userRoute');
const task = require('./Tasks/taskRoute');
const cookieParser = require('cookie-parser');
const error = require('./middleware/errorHandler');

dotenv.config({ path: './config.env' });

const app = express();
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/user', user);
app.use('/task', task);

app.use(error);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
