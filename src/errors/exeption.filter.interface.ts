import { NextFunction, Request, Response } from 'express';

//мутим interface для ошибок
export interface IExeptionFilter {
	catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
