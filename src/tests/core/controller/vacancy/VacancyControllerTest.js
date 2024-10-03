import { findVacancyLinks } from '../../../../core/controllers/vacancy/VacancyController.js';
import VacancyService from '../../../../core/services/vacancy/VacancyService.js';
import Logger from '../../../../core/utils/log/Logger.js';
import RequestValidator from '../../../../core/domain/validators/RequestValidator.js';
import ApiException from '../../../../core/domain/exceptions/ApiException.js';

jest.mock('../../../../core/services/vacancy/VacancyService.js');
jest.mock('../../../../core/utils/log/Logger.js', () => ({
    controller: jest.fn(),
    error: jest.fn()
}));
jest.mock('../../../../core/domain/validators/RequestValidator.js', () => ({
    validateVacancyRequest: jest.fn()
}));

describe('findVacancyLinks', () => {
    let request;
    let response;

    beforeEach(() => {
        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        request = {
            body: {
                role: 'Role test',
                locality: 'Locality test',
                seniority: 'Seniority test',
                additional_informations: 'Additional information test'
            }
        };
    });

    it('Should find vacancy links successfully', async () => {
        const expectedResult = { response: 'Vacancy links found successfully'};
        VacancyService.prototype.requestVacancyLinks.mockResolvedValue(expectedResult);

        await findVacancyLinks(request, response);
        expect(Logger.controller).toHaveBeenCalledTimes(1);
        expect(RequestValidator.validateVacancyRequest).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(expectedResult);
    });

    it('Should threat exception without code and message', async () => {
        VacancyService.prototype.requestVacancyLinks.mockImplementation(() => {
            throw new Error();
        });

        await findVacancyLinks(request, response);
        expect(Logger.controller).toHaveBeenCalledTimes(1);
        expect(Logger.error).toHaveBeenCalledTimes(1);
        expect(RequestValidator.validateVacancyRequest).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith({
            title: 'ERRO!',
            code: 500,
            error: 'Ocorreu um erro inesperado.'
        });
    });

    it('Should threat exception with code and message', async () => {
        const errorMessage = 'Error message';
        VacancyService.prototype.requestVacancyLinks.mockImplementation(() => {
            throw new ApiException(errorMessage, 404);
        });

        await findVacancyLinks(request, response);
        expect(Logger.controller).toHaveBeenCalledTimes(1);
        expect(Logger.error).toHaveBeenCalledTimes(1);
        expect(RequestValidator.validateVacancyRequest).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledWith({
            title: 'ERRO!',
            code: 404,
            error: errorMessage
        });
    });
});
