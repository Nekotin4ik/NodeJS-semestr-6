import { injectable } from 'inversify';
import { Logger } from 'tslog';
import { ILogger } from './logger.interface';
import 'reflect-metadata';

//получается, говорим, что класс LogerService должен удовлетворять interface ILogger
@injectable()
export class LoggerService implements ILogger {
	public logger: Logger;

	//сделали абстракцию над логгером, что б скрыть настройки конфигурации
	constructor() {
		this.logger = new Logger({
			displayInstanceName: false,
			displayLoggerName: false,
			displayFilePath: 'hidden',
			displayFunctionName: false,
		});
	}

	//имплементируем метод log
	log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	error(...args: unknown[]): void {
		//отправка в sentry / rollbar сайты для обработки ошибок бека
		this.logger.error(...args);
	}

	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
