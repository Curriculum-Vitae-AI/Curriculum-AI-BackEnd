import LogService from '../log/LogService.js';
import Logger from '../../utils/log/Logger.js';
import PdfService from '../pdf/PdfService.js';
import GeminiService from '../gemini/GeminiService.js';

export default class MotivationLetterService {
    constructor() {
        this.logService = new LogService();
        this.pdfService = new PdfService();
        this.geminiService = new GeminiService();
        this.serviceName = 'CARTA_DE_MOTIVACAO';
    }
    async generateMotivationLetter(request) {
        const methodName = 'generateMotivationLetter';
        Logger.start(methodName);
        try {
            Logger.info(methodName, 'Gerando carta de motivação...');
            const geminiRequest = this.#defineMotivationLetterTextRequest(request);
            const geminiResponse = await this.geminiService.getMotivationLetterBody(geminiRequest.data);
            await this.logService.createLog(geminiRequest, geminiResponse, this.serviceName);
            const pdf = this.pdfService.generateMotivationLetterPdf(geminiResponse);
            Logger.info(methodName, 'Carta de motivação gerada com sucesso!');
            return pdf;
        } catch (exception) {
            Logger.error(methodName, exception);
            throw exception;
        } finally {
            Logger.finish(methodName);
        }
    }
    #defineMotivationLetterTextRequest(request) {
        return {
            data: `Considere os dados abaixo para montar o corpo de uma carta de motivação: 
        empresa=${request.company}; vaga=${request.role}; experiencia=${request.experience};
        para a resposta considere: 
        code: deve ser 200 para sucesso e 400 para caso a vaga não seja um trabalho de verdade (somente valide se existe sem comparar com a experiencia); 
        response: nao deve ter quebras de linha nem campos a serem preenchidos posteriomente; 
        greetings: neste coloque a finalização (ex: atenciosamente, nome)`
        };
    }
}
