//от него мы будем наследоваться
//часть функционала, должна быть имплементирована здесь

import { LoggerService } from '../logger/logger.service';
import { Router, Response } from 'express';
import { injectable } from 'inversify';
import { ExpressReturnType, IControllerRoute } from './route.interface';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
	//readonly что б мы не могли никак менять
	private readonly _router: Router;

	//пока нет DI LoggerService указываем явно, что б логировать, что мы инициалезировали класс
	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	}

	//метод, в котором будет происходить биндинг функции класса к некоторым роутам
	//что б определить тип routes создадим interface
	protected bindRoutes(routes: IControllerRoute[]): void {
		//проходимся циклом и биндим каждый route
		for (const route of routes) {
			this.logger.log('[' + route.method + '] ' + route.path);
			const middleware = route.middlewares?.map((m) => m.execute.bind(m)); //прошлись по всем middleware и перебиндили контекст
			const handler = route.func.bind(this); //связываем текущий контекст с функцией
			const pipeline = middleware ? [...middleware, handler] : handler; //состоит из 1го hadler если нету middleware или из middleware`ов и hadler
			this.router[route.method](route.path, pipeline); //один из минусов, если б мы напрямую передали route.func мы потеряли контекст
			//функции. При дальнейшем вызове this, он будет относиться не к классу контроллера,
			//а исключительно к express func
		}
	}
}
