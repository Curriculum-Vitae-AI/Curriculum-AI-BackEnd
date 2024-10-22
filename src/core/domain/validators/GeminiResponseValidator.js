import ApiException from '../exceptions/ApiException.js';

export default class GeminiResponseValidator {
    static validateMotivationLetterResponse(response) {
        if (!response.code || response.code === '400') {
            throw new ApiException('Revise os dados preenchidos e tente novamente.', 400);
        }
        if (!response.response || response.response.lenght === 0) {
            throw new ApiException('Houve um erro com a resposta do Gemini, tente novamente mais tarde.', 500);
        }
    }
}
