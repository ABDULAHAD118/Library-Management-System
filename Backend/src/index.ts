import 'dotenv/config';
import express from "express"

import connectDB from './config/connection.ts';
import router from './routes/users.ts';

const app = express();
const port = process.env.PORT;

const mongoUri = process.env.MONGO_URI;
if (mongoUri) {
    await connectDB(mongoUri);
}

app.use('/users',router);

app.listen(port,()=>{
    console.log(`Server is started at http://localhost:${port}`);
})
