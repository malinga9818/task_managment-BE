import type { Request, Response, NextFunction } from "express";
export declare const validateDto: <T extends object>(dtoClass: new () => T) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=validate.middleware.d.ts.map