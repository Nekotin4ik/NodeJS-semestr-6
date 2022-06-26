import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	//добавляем декораторы, которые хранят инфу о том, что нам нужно валидировать
	@IsEmail({}, { message: 'Invalid email input!' })
	email: string;

	@IsString({ message: 'There is no password in input' })
	password: string;

	@IsString({ message: 'There is no name in input' })
	name: string;
}
