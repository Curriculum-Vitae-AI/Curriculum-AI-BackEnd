import ApiException from '../exceptions/ApiException.js';

export default class RequestValidator {
    static validateRoadMapRequest(request) {
        if (!request.job || request.job.lenght === 0) {
            throw new ApiException('Requisição sem o atributo job.', 400);
        }
    }
    static validateMotivationLetterRequest(request) {
        if (!request.company || request.company.lenght === 0) {
            throw new ApiException('Requisição sem o atributo company.', 400);
        }
        if (!request.role || request.role.lenght === 0) {
            throw new ApiException('Requisição sem o atributo role.', 400);
        }
        if (!request.experience || request.experience.lenght === 0) {
            throw new ApiException('Requisição sem o atributo experience.', 400);
        }
    }
    static validateVacancyRequest(request) {
        if (!request.role || request.role.lenght === 0) {
            throw new ApiException('Requisição sem o atributo role.', 400);
        }
        if (!request.locality || request.locality.lenght === 0) {
            throw new ApiException('Requisição sem o atributo locality.', 400);
        }
        if (!request.seniority || request.seniority.lenght === 0) {
            throw new ApiException('Requisição sem o atributo seniority.', 400);
        }
    }
}
