const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const user = require('./routes/user');
const task = require('./routes/task');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './config.env' });

const app = express();
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/user', user);
app.use('/task', task);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
