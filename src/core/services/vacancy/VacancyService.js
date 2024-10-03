import LogService from '../log/LogService.js';
import Logger from '../../utils/log/Logger.js';

import { format } from 'date-fns';

export default class VacancyService {
    constructor() {
        this.logService = new LogService();
        this.serviceName = 'VAGAS';
    }
    async requestVacancyLinks(request) {
        const methodName = 'requestVacancyLinks';
        Logger.start(methodName);
        try {
            Logger.info(methodName, 'Gerando links de vagas...');
            const response = {
                message: `Requisição de ${this.serviceName} efetuada com sucesso. Log salvo em ${format(new Date(), 'dd/MM/yyyy HH:mm')}`
            };
            await this.logService.createLog(request, response, this.serviceName);
            Logger.info(methodName, 'Links de vagas gerados com sucesso!');
            return response;
        } catch (exception) {
            Logger.error(methodName, exception);
            throw exception;
        } finally {
            Logger.finish(methodName);
        }
    }
}
