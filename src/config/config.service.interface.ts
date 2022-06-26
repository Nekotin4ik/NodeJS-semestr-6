//это будет сервис с сохраннёной конфигурацией
export interface IConfigService {
	get: (key: string) => string;
}
