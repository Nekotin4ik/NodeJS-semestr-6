export class HTTPError extends Error {
	statusCode: number; //число, что б сохранить в объекте ошибки
	context?: string;

	constructor(statusCode: number, message: string, context?: string) {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
		this.context = context;
	}
}
