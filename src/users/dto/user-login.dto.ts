import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Invalid email input!' })
	email: string;

	@IsString()
	password: string;
}
