import { NextFunction, Request, Response, Router } from 'express';
import { IMiddleware } from './middleware.interface';

export interface IControllerRoute {
	path: string; //по какому пути будем биндить
	//функция, которую будем биндить.
	//и нам нужон метод, что б её биндить (get,post,delete)
	func: (req: Request, res: Response, next: NextFunction) => void;
	//pick это утилитарный тип, который берёт из interface, указанные значения
	//и создаёт из них новый interface. Router - откуда берём, всё остальное это то, что мы передаём
	//запись снизу правильная, как минимум она на уровне компиляции, в случае опечятки укажет, что мы ошиблись
	//получается, мы создали interface на основе ключ-значения метод Router, а потом с помощью взятия ключей сделали нормальный interface
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
	//Добавляем обработку массива middleware
	middlewares?: IMiddleware[];
}

export type ExpressReturnType = Response<any, Record<string, any>>;
