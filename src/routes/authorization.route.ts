import { Request, Response, NextFunction, Router } from "express";

import ForbiddenError from "../models/errors/forbidden.model";
import JWT, { SignOptions } from 'jsonwebtoken'
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic.authentication.middleware";
import jwtAuthenticationMiddleware from "../middlewares/jwt.authentication.middleware";

const authorizationRoute = Router();

authorizationRoute.post('/token/validate', jwtAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK)
})

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user = req.user;

        if (!user) {
            throw new ForbiddenError('Usuário não informado');
        }

        const jwtPayload = { username: user.username }
        const secretKey = 'my_secret_key'
        const jwtOptions: SignOptions = { subject: user?.uuid, expiresIn: '15m' }
        const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

        res.status(StatusCodes.OK).json({ token: jwt })

    } catch (error) {
        next(error);
    }
})

export default authorizationRoute;