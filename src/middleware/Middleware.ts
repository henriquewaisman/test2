import { NextFunction, Request, Response } from 'express';
import { validateHash } from '../utils/BcryptUtils';

class AuthMiddlewares {
  constructor() {}

  async userAutorized(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      return res.json({
        status: 401,
        message: 'Error: Token not providade',
      });
    }

    if (await validateHash(req.body.password, req.headers.authorization)) {
      next();
    } else {
      return res.json({
        status: 401,
        message: 'Error:  Invalid Token',
      });
    }
  }
}

export default new AuthMiddlewares();