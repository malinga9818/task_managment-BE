import { plainToInstance } from "class-transformer"
import { validate } from "class-validator";
import type { Request, Response, NextFunction } from "express"

export const validateDto = <T extends object>(dtoClass: new () => T) => {
    return async (req:Request, res:Response, next:NextFunction) => {
        const dtoInstance = plainToInstance(dtoClass, req.body);
        const errors = await validate(dtoInstance);

        if (errors.length > 0) {
            const message = errors.map((err) => Object.values(err.constraints || {}).flat());
            return res.status(400).json({message:"Validate Failde", errors:message});
        }

        req.body = dtoInstance;
        next();
    }
}    