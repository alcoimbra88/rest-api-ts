import express, { Request, Response, NextFunction } from 'express';
import statusRoute from './routes/status.route';

import usersRoute from './routes/users.route';

const app = express();


// App config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes config
app.use(usersRoute);
app.use(statusRoute);

// Server
app.listen(3000, () => {
    console.log('App running at port 3000');
    console.log('localhost:3000/status');
});