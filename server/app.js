import express from 'express';
import cors from 'cors';
import color from 'colors';
import dotenv from 'dotenv';
import connectdb from './config/connectDb.js';
import router from './routes/userRoute.js';
import adminrouter from './routes/taskRoute.js';
import path from 'path';


const app = express();
app.use(express.json());


const _dirname = path.dirname("");  // Corrected to get the directory of this file
const buildpath = path.join(_dirname, '../client/build');

// Serve static files from the client build folder
app.use(express.static(buildpath));


dotenv.config();

// Enable CORS
app.use(cors({
    origin: '*', // Allow all origins, adjust as needed
}));

// Connect to the database
connectdb();

// Define routes
app.use('/api', router);    // Updated to make it clear this is for user routes
app.use('/api', adminrouter);  // Updated to make it clear this is for admin routes

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`.bgWhite);
});
