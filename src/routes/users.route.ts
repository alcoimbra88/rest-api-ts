import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes'
import userReposiory from "../repositories/user.reposiory";

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userReposiory.findAllusers();
    res.status(StatusCodes.OK).send({users});
})

usersRoute.get('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    //dataBase.getUserByUUid(uuid)
    res.status(StatusCodes.OK).send({ uuid })
})

usersRoute.post('/users', (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body
    res.status(StatusCodes.CREATED).send(newUser)
});

usersRoute.put('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uui = req.params.uuid;
    const modifiedUser = req.body;

    modifiedUser.uui = uui;

    res.status(StatusCodes.OK).send({ modifiedUser })
})

usersRoute.delete('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    //dataBase.getUserByUUid(uuid)
    res.status(StatusCodes.OK).send(` User id:${uuid} Deleted`)
})

export default usersRoute;
