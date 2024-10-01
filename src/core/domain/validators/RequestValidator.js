import ApiException from '../exceptions/ApiException.js';

export default class RequestValidator {
    static validateRoadMapRequest(request) {
        if (!request.job || request.job.lenght === 0) {
            throw new ApiException('Requisição sem o atributo job.', 400);
        }
    }
}
