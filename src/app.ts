import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import { db } from './models';


const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
const corsOptions = {
    origin: ['http://localhost:4200', 'http://localhost:3001']
};
app.use(cors(corsOptions));

// routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
// app.use('/', defaultUserRoute);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});

db.sync({ alter: true }).then(() => {
    console.info("connected to the database!")
});

app.listen(3000);