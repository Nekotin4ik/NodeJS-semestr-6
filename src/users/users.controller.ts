import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { BaseController } from '../common/base.controller';
import { ValidateMiddleware } from '../common/validate.middleware';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserService } from './user.service';
import { IUserController } from './users.controller.interface';
import { sign } from 'jsonwebtoken'; //функция для подписывания webtoken
import { ConfigService } from '../config/config.service';
import { IConfigService } from '../config/config.service.interface';
import { IUserService } from './users.service.interface';
import { AuthGuard } from '../common/auth.guard';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
				middlewares: [new AuthGuard()],
			},
		]);
	}

	//биндим методы данного класса на соответсвующие route
	//получается получаем body, благодаря pipe валидируем его, потом валидириуем пользователя по данным
	async login(
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.validateUser(req.body);
		if (!result) {
			return next(new HTTPError(401, 'Auth error!', 'login'));
		}
		const jwt = await this.signJWT(req.body.email, this.configService.get('SECRET')); //SECRET берём из env файлов
		this.ok(res, { jwt });
		//console.log(req.body); //тут лежит как раз объект UserLoginDto
		//нужон bodyparser
		//передача ошибки exeptionFilter`у
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'Such user already exist'));
		}
		this.ok(res, { email: result.email, id: result.id });
	}

	async info(
		{ user }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const userInfo = await this.userService.getUserInfo(user);
		//user может быть налом, потому вопросики
		this.ok(res, { email: userInfo?.email, id: userInfo?.id });
	}

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) {
						reject(err);
					}
					resolve(token as string); //токен, в зависимости от того есть ошибка или нету, может быть значением или undefined, тут мы полностью уверены, что при ошибке мы выйдем до получения токена
				},
			);
		});
	}
}
