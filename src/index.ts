import express from 'express';
import dotenv from 'dotenv';

import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';
import errorHandler from './middlewares/error-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import jwtAuthenticationMiddleware from './middlewares/jwt.authentication.middleware';

dotenv.config();

const app = express();

// App config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes config
app.use(statusRoute);
app.use(usersRoute);

app.use(jwtAuthenticationMiddleware)
app.use(authorizationRoute)

// Confi Handlers Errors
app.use(errorHandler)

// Server
app.listen(3000, () => {
    console.log('App running at port 3000');
    console.log('localhost:3000/status');
});