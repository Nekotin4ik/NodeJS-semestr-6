import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { IExeptionFilter } from './exeption.filter.interface';
import { HTTPError } from './http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';

@injectable()
export class ExeptionFilter implements IExeptionFilter {
	//для логирования ошибок - конструктор
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}
	//может принимать и обычный Error, но и HTTPError
	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		//проверяем, что именно передалось
		//instanceof считай стандарт для проверки классов
		//нужон в случае если у нас есть тип имеющий union от 2 классов
		if (err instanceof HTTPError) {
			this.logger.error('[' + err.context + '] Ошибка ' + err.statusCode + ': ' + err.message); //ошибка принимает контекст и msg и статус код
			res.status(err.statusCode).send({ err: err.message });
		} else {
			this.logger.error(err.message);
			res.status(500).send({ err: err.message }); //ответ пользователю
			//делаем свой класс http error для возможности отправлять разные коды ошибок
		}
	}
}
