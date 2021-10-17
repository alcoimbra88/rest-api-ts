import { Response,Request,NextFunction } from "express";
import DataBaseError from "../models/errors/database.error.model";
import { StatusCodes } from "http-status-codes";
import ForbiddenError from "../models/errors/forbidden.model";

function  errorHandler(error: any, req:Request, res:Response, next: NextFunction) {

    if (error instanceof DataBaseError){
        res.status(StatusCodes.BAD_REQUEST)
}else if(error instanceof ForbiddenError){
    res.status(StatusCodes.FORBIDDEN);
}else{
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
}

}

export default errorHandler;