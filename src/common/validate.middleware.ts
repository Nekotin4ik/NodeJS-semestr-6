//создаём валидатор данных на входе
//если данные валидны передаём их дальше, если нет, то передаём ошибку

import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from './middleware.interface';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

//даннные валидны, если удовлетворяют interface IMiddleware
export class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>) {}

	execute({ body }: Request, res: Response, next: NextFunction): void {
		const instance = plainToClass(this.classToValidate, body); //преобразовывает конкретный объект к ClassTransformer
		//проверяет не пустой ли массив ошибок, если ошибки есть, то возращает статус 422, если нету, то переходит к следующему обработчику
		validate(instance).then((errors) => {
			if (errors.length > 0) {
				res.status(422).send(errors);
			} else {
				next();
			}
		});
	}
}
