import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import { ExeptionFilter } from './errors/exeption.filter';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { UserService } from './users/user.service';
import { UserController } from './users/users.controller';
import { IUserController } from './users/users.controller.interface';
import { UsersRepository } from './users/users.repository';
import { IUsersRepository } from './users/users.repository.interface';
import { IUserService } from './users/users.service.interface';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	//засовываем все биндниги в модуль
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope(); //фактически, мы положили инфу в контейнеры, что interface ILogger
	//соответствует LoggerService. Если где-то будем делать injection по токену
	//TYPES.ILogger, то мы должны взять instance LoggerService и положить туда
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope(); //означает, что при более чем 1 вызове, в первый раз создаётся instance класс, который потом будет передан во все inject
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
}); //аналогично appContainer бинду

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings); // вставляем модуль с биндингами
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

//простейший Dependancy injection
//через конструктор внедряем в App зависимости от другого сервиса (в нашем случае LoggerService)

//инициализация класса
// const logger = new LoggerService();
// const app = new App(
//     logger,
//     new UserController(logger),
//     new ExeptionFilter(logger)
//     );
//меняем на контейнер

//у app появляются новые методы
//const app = appContainer.get<App>(TYPES.Application);

export const { app, appContainer } = bootstrap();
