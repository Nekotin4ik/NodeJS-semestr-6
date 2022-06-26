import { UserModel } from '@prisma/client';
import { User } from './user.entity';

//Данный репозиторий позволяет создавать пользователя и находить его?
export interface IUsersRepository {
	create: (user: User) => Promise<UserModel>;
	find: (email: string) => Promise<UserModel | null>;
}
