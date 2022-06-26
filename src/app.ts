import express, { Express } from 'express'; //Express - интерфейс описывающий приложение
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { json } from 'body-parser';
import 'reflect-metadata';
import { IUserController } from './users/users.controller.interface';
import { IConfigService } from './config/config.service.interface';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { UserController } from './users/users.controller';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './common/auth.middleware';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	//для адекватности, передаём logger в конструктор
	//и вместо того, что б каждый раз конструировать из того, что мы имее
	//мы будем ожидать, что нам передадут LoggerService
	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json()); //будет парсить body
		//использование middleware
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	//обработка ошибок
	useExeptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter)); //так, опять теряем контекст и фиксим привязкой текущего контекста
	}

	//метод инициализации приложения
	//включает в себя создание сервера и listen
	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilters(); //делаем при помози класса
		await this.prismaService.connect(); //асинхронно подключаемся к бд
		this.server = this.app.listen(this.port);
		this.logger.log('Server started on http://localhost:' + this.port);
	}
}

//инициализация класса в main.ts
