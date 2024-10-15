import { createMotivationLetter } from '../../../../core/controllers/motivation-letter/MotivationLetterController.js';
import MotivationLetterService from '../../../../core/services/motivation-letter/MotivationLetterService.js';
import Logger from '../../../../core/utils/log/Logger.js';
import RequestValidator from '../../../../core/domain/validators/RequestValidator.js';
import ApiException from '../../../../core/domain/exceptions/ApiException.js';

jest.mock('../../../../core/services/motivation-letter/MotivationLetterService.js');
jest.mock('../../../../core/utils/log/Logger.js', () => ({
    controller: jest.fn(),
    error: jest.fn()
}));
jest.mock('../../../../core/domain/validators/RequestValidator.js', () => ({
    validateMotivationLetterRequest: jest.fn()
}));

describe('createMotivationLetter', () => {
    let request;
    let response;

    beforeEach(() => {
        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            setHeader: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis()
        };
        request = {
            body: {
                company: 'Company test',
                role: 'Role test',
                experience: 'Experience test'
            }
        };
    });

    it('Should create a motivation letter successfully', async () => {
        const expectedResult = { response: 'MotivationLetter created successfully' };
        MotivationLetterService.prototype.generateMotivationLetter.mockResolvedValue(expectedResult);

        await createMotivationLetter(request, response);
        expect(Logger.controller).toHaveBeenCalledTimes(1);
        expect(RequestValidator.validateMotivationLetterRequest).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.setHeader).toHaveBeenCalledTimes(2);
    });

    it('Should threat exception without code and message', async () => {
        MotivationLetterService.prototype.generateMotivationLetter.mockImplementation(() => {
            throw new Error();
        });

        await createMotivationLetter(request, response);
        expect(Logger.controller).toHaveBeenCalledTimes(1);
        expect(Logger.error).toHaveBeenCalledTimes(1);
        expect(RequestValidator.validateMotivationLetterRequest).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith({
            title: 'ERRO!',
            code: 500,
            error: 'Ocorreu um erro inesperado.'
        });
    });

    it('Should threat exception with code and message', async () => {
        const errorMessage = 'Error message';
        MotivationLetterService.prototype.generateMotivationLetter.mockImplementation(() => {
            throw new ApiException(errorMessage, 404);
        });

        await createMotivationLetter(request, response);
        expect(Logger.controller).toHaveBeenCalledTimes(1);
        expect(Logger.error).toHaveBeenCalledTimes(1);
        expect(RequestValidator.validateMotivationLetterRequest).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledWith({
            title: 'ERRO!',
            code: 404,
            error: errorMessage
        });
    });
});
