import LogService from '../log/LogService.js';
import Logger from '../../utils/log/Logger.js';

import { format } from 'date-fns';

export default class MotivationLetterService {
    constructor() {
        this.logService = new LogService();
        this.serviceName = 'CARTA_DE_MOTIVACAO';
    }
    async generateMotivationLetter(request) {
        const methodName = 'generateMotivationLetter';
        Logger.start(methodName);
        try {
            Logger.info(methodName, 'Gerando carta de motivação...');
            const response = {
                message: `Requisição de ${this.serviceName} efetuada com sucesso. Log salvo em ${format(new Date(), 'dd/MM/yyyy HH:mm')}`
            };
            await this.logService.createLog(request, response, this.serviceName);
            Logger.info(methodName, 'Carta de motivação gerada com sucesso!');
            return response;
        } catch (exception) {
            Logger.error(methodName, exception);
            throw exception;
        } finally {
            Logger.finish(methodName);
        }
    }
}
