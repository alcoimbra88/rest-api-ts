import { Request, Response, NextFunction } from "express";

import ForbiddenError from "../models/errors/forbidden.model";
import userReposiory from "../repositories/user.reposiory";


export default async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
    try{
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader) {
            throw new ForbiddenError('Credenciais não informadas')
        }

        const [authenticationType, token] = authorizationHeader.split(' ');

        if(authenticationType !== 'Basic' || !token){
            throw new ForbiddenError('Tipo de autenticação inválido')
        }

        const tokenContent = Buffer.from(token, 'base64').toString('utf-8')

        const [userName, password] = tokenContent.split(':');

        if(!userName || !password) {
            throw new ForbiddenError('Credenciais não preenchidas')
        }

        const user = await userReposiory.findByUsernameAndPassword(userName, password);

        if(!user){
            throw new ForbiddenError('Usuário ou senha inválidos')
        }

        req.user = user;
        next();

    }catch(error){
        next(error)
    }
}