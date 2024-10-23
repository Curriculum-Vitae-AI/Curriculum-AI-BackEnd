import ApiException from '../exceptions/ApiException.js';

export default class GeminiResponseValidator {
    static validateGeminiResponse(response) {
        if (!response.code || response.code === '400') {
            throw new ApiException('Não foi possível processar sua requisição, favor verificar os dados preenchidos antes de tentar novamente.', 400);
        }
        if (!response.response || response.response.length === 0) {
            throw new ApiException('Houve um erro com a resposta do Gemini, tente novamente mais tarde.', 500);
        }
    }
}
