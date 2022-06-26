//кастомные типы
//объявляем пространство имён и дополняем интерфейс Request
declare namespace Express {
	export interface Request {
		user: string;
	}
}
