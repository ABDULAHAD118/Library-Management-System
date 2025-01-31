import 'dotenv/config';
import express from 'express';

import connectDB from './config/connection';
import userRouter from './routes/users';
import departmentRouter from './routes/departments';

const app = express();
const port = process.env.PORT;

(async () => {
  const mongoUri = process.env.MONGO_URI;
  if (mongoUri) {
    await connectDB(mongoUri);
  }
})();

app.use(express.json());

app.use('/users', userRouter);
app.use('/departments', departmentRouter);

app.listen(port, () => {
  console.log(`Server is started at http://localhost:${port}`);
});
