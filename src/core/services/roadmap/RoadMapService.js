import LogService from '../log/LogService.js';
import Logger from '../../utils/log/Logger.js';
import PdfService from '../pdf/PdfService.js';
import GeminiService from '../gemini/GeminiService.js';
import GeminiResponseValidator from '../../domain/validators/GeminiResponseValidator.js';

export default class RoadMapService {
    constructor() {
        this.logService = new LogService();
        this.pdfService = new PdfService();
        this.geminiService = new GeminiService();
        this.serviceName = 'ROADMAP';
    }
    async generateRoadmap(request) {
        const methodName = 'generateRoadmap';
        Logger.start(methodName);
        try {
            Logger.info(methodName, 'Gerando roadmap...');
            const geminiRequest = this.#defineRoadMapTextRequest(request);
            const geminiResponse = await this.geminiService.getRoadMapBody(geminiRequest.data);
            await this.logService.createLog(geminiRequest, geminiResponse, this.serviceName);
            GeminiResponseValidator.validateGeminiResponse(geminiResponse);
            const pdf = this.pdfService.generateRoadMapPdf(geminiResponse);
            Logger.info(methodName, 'Roadmap gerado com sucesso!');
            return pdf;
        } catch (exception) {
            Logger.error(methodName, exception);
            throw exception;
        } finally {
            Logger.finish(methodName);
        }
    }
    #defineRoadMapTextRequest(request) {
        return {
            data: `monte um roadmap com o seguinte tema:
            ${request.job}
            resposta:
            codigo 200 para sucesso e 400 para caso a requisição não faça sentido
            maximo de 2 topicos e 4 materias por nivel
            topicName deve ser um nome simples de no máximo 3 palavras para o roadmap , exemplo "Estudos Java".
            não repita nome de tópicos e matérias`
        };
    }
}
