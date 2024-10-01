import LogRepository from '../../repositories/LogRepository.js';
import Logger from '../../utils/log/Logger.js';

export default class LogService {
    constructor() {
        this.logRepository = new LogRepository();
    }
    async createLog(req, resp, svc) {
        const methodName = 'createLog';
        Logger.start(methodName);
        try {
            const logEntity = {
                request: req,
                response: resp,
                service: svc,
                date: new Date()
            };
            Logger.info(methodName, `Salvando log no banco de dados...`);
            const response = await this.logRepository.save(logEntity);
            Logger.info(methodName, 'Log salvo com sucesso!');
            return response;
        } catch (exception) {
            Logger.error(methodName, exception);
            throw exception;
        } finally {
            Logger.finish(methodName);
        }
    }
}
