import LogService from '../log/LogService.js';
import Logger from '../../utils/log/Logger.js';
import GeminiService from '../gemini/GeminiService.js';
import GeminiResponseValidator from '../../domain/validators/GeminiResponseValidator.js';

export default class VacancyService {
    constructor() {
        this.logService = new LogService();
        this.geminiService = new GeminiService();
        this.serviceName = 'VAGAS';
    }
    async requestVacancyLinks(request) {
        const methodName = 'requestVacancyLinks';
        Logger.start(methodName);
        try {
            Logger.info(methodName, 'Gerando links de vagas...');
            const geminiRequest = this.#defineVacancyTextRequest(request);
            const geminiResponse = await this.geminiService.getVacancyLinks(geminiRequest.data);
            await this.logService.createLog(geminiRequest, geminiResponse, this.serviceName);
            GeminiResponseValidator.validateGeminiResponse(geminiResponse);
            Logger.info(methodName, 'Links de vagas gerados com sucesso!');
            return geminiResponse;
        } catch (exception) {
            Logger.error(methodName, exception);
            throw exception;
        } finally {
            Logger.finish(methodName);
        }
    }
    #defineVacancyTextRequest(request) {
        return {
            data: `encontre link de vagas com os seguintes atributos:
        cargo: ${request.role}
        localidade: ${request.locality}
        senioridade: ${request.seniority}
        resposta:
        code deve ser 200 para sucesso e 400 para caso os atributos não façam sentido`
        };
    }
}
