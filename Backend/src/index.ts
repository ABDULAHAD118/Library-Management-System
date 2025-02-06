import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import connectDB from './config/connection';
import userRouter from './routes/users';
import departmentRouter from './routes/departments';
import bookRouter from './routes/books';

const app = express();
const port = process.env.PORT;

(async () => {
  const mongoUri = process.env.MONGO_URI;
  if (mongoUri) {
    await connectDB(mongoUri);
  }
})();

app.use(
  cors({
    origin: 'http://localhost:5173', // Or use '*' to allow any origin (not recommended for production)
  }),
);

app.use(express.json());

app.use('/departments', departmentRouter);
app.use('/users', userRouter);
app.use('/books', bookRouter);

app.listen(port, () => {
  console.log(`Server is started at http://localhost:${port}`);
});
