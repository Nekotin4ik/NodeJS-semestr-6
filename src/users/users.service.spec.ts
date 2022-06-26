import 'reflect-metadata';
import { Container } from 'inversify';
import { UserModel } from '@prisma/client';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { IUsersRepository } from './users.repository.interface';
import { IUserService } from './users.service.interface';
import { UserService } from './user.service';
import { User } from './user.entity';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();
//зависимости
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

//функция, которая будет выполняться перед всеми тестами
beforeAll(() => {
	//связываем зависимости с контейнером
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock); //делаем привязку к константе, теперь константа должна удовлетворять тип ConfigService
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);

	//получаем зависимости
	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	usersService = container.get<IUserService>(TYPES.UserService);
});

//описывает, что мы тестируем
describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1'); //равносильно тому, что get вернул 1
		//при затрагивании в проекте usersRepository.crete, в результате оно получит значение снизу
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		const createdUser = await usersService.createUser({
			email: 'a@a.com',
			name: 'Pavel',
			password: '1',
		});
		expect(createdUser?.id).toEqual(1); //expect ожидает на выход то, что указано после точки
		expect(createdUser?.password).not.toEqual('1');
	});
});
