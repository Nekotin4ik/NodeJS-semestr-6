import { IMiddleware } from './middleware.interface';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

//middleware, отвечающий за авторизацию
export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		//мы должны получить header, которые содержаться в Request
		if (req.headers.authorization) {
			//проверяет соответсвие токена секрету
			verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload) {
					payload = payload as Object; //привет костыль, эта зараза считала, что мой payload строка
					req.user = payload.email;
					next();
				}
			});
		} else {
			next();
		}
	}
}
