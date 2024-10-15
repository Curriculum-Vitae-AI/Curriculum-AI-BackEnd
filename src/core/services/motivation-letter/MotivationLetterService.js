import LogService from '../log/LogService.js';
import Logger from '../../utils/log/Logger.js';
import PdfService from '../pdf/PdfService.js';

export default class MotivationLetterService {
    constructor() {
        this.logService = new LogService();
        this.pdfService = new PdfService();
        this.serviceName = 'CARTA_DE_MOTIVACAO';
    }
    async generateMotivationLetter(request) {
        const methodName = 'generateMotivationLetter';
        Logger.start(methodName);
        try {
            Logger.info(methodName, 'Gerando carta de motivação...');
            const response = this.pdfService.generateMotivationLetterPdf();
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
