import 'dotenv/config';
import express from "express"

import connectDB from './src/config/connection.js';
import router from './src/routes/users.js'

const app = express();
const port = process.env.PORT;

await connectDB(process.env.MONGO_URI);

app.use('/users',router);

app.listen(port,()=>{
    console.log(`Server is started at http://localhost:${port}`);
})
