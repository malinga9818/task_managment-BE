import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
export const validateDto = (dtoClass) => {
    return async (req, res, next) => {
        const dtoInstance = plainToInstance(dtoClass, req.body);
        const errors = await validate(dtoInstance);
        if (errors.length > 0) {
            const message = errors.map((err) => Object.values(err.constraints || {}).flat());
            return res.status(400).json({ message: "Validate Failde", errors: message });
        }
        req.body = dtoInstance;
        next();
    };
};
//# sourceMappingURL=validate.middleware.js.map