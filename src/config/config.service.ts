import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { inject, injectable } from 'inversify';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config(); //результат парсинга, тип DotenvConfigError возвращает ерор, если мы не смогли спарсить или результат парсинга при успехе
		if (result.error) {
			this.logger.error('[ConfigService] Didn`t manage to read file .env or there is no such file');
		} else {
			this.logger.log('[ConfigService] Configuration .env loaded');
			this.config = result.parsed as DotenvParseOutput;
		}
	}
	get(key: string): string {
		return this.config[key];
	}
}
