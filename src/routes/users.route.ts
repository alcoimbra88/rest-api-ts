import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes'
import jwtAuthenticationMiddleware from "../middlewares/jwt.authentication.middleware";
import userReposiory from "../repositories/user.reposiory";

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userReposiory.findAllusers();
    res.status(StatusCodes.OK).send({ users });
})

usersRoute.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        const user = await userReposiory.findBYId(uuid);
        res.status(StatusCodes.OK).send(user)

    } catch (error) {
        next(error);
    }
})

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body
    const uuid = await userReposiory.create(newUser)
    res.status(StatusCodes.CREATED).send(uuid)
})

usersRoute.put('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uui = req.params.uuid;
    const modifiedUser = req.body;

    modifiedUser.uui = uui;

    await userReposiory.update(modifiedUser);

    res.status(StatusCodes.OK).send({ modifiedUser })
})

usersRoute.delete('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    await userReposiory.remove(uuid)
    res.status(StatusCodes.OK).send(` User id:${uuid} Deleted`)
})

export default usersRoute;
