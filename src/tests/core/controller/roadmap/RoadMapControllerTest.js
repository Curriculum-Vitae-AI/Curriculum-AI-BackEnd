import { createRoadMap } from '../../../../core/controllers/roadmap/RoadMapController.js';
import RoadMapService from '../../../../core/services/roadmap/RoadMapService.js';
import Logger from '../../../../core/utils/log/Logger.js';
import RequestValidator from '../../../../core/domain/validators/RequestValidator.js';
import ApiException from '../../../../core/domain/exceptions/ApiException.js';

jest.mock('../../../../core/services/roadmap/RoadMapService.js');
jest.mock('../../../../core/utils/log/Logger.js', () => ({
    controller: jest.fn(),
    error: jest.fn()
}));
jest.mock('../../../../core/domain/validators/RequestValidator.js', () => ({
    validateRoadMapRequest: jest.fn()
}));

describe('createRoadMapTest', () => {
    let request;
    let response;

    beforeEach(() => {
        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        request = {
            body: {
                job: 'I want a back end job'
            }
        };
    });

    it('Should create a roadmap successfully', async () => {
        const expectedResult = { response: 'Roadmap created successfully' };
        RoadMapService.prototype.generateRoadmap.mockResolvedValue(expectedResult);

        await createRoadMap(request, response);
        expect(Logger.controller).toHaveBeenCalledTimes(1);
        expect(RequestValidator.validateRoadMapRequest).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(expectedResult);
    });

    it('Should threat exception without code and message', async () => {
        RoadMapService.prototype.generateRoadmap.mockImplementation(() => {
            throw new Error();
        });

        await createRoadMap(request, response);
        expect(Logger.controller).toHaveBeenCalledTimes(1);
        expect(Logger.error).toHaveBeenCalledTimes(1);
        expect(RequestValidator.validateRoadMapRequest).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith({
            title: 'ERRO!',
            code: 500,
            error: 'Ocorreu um erro inesperado.'
        });
    });

    it('Should threat exception with code and message', async () => {
        const errorMessage = 'Error message';
        RoadMapService.prototype.generateRoadmap.mockImplementation(() => {
            throw new ApiException(errorMessage, 404);
        });

        await createRoadMap(request, response);
        expect(Logger.controller).toHaveBeenCalledTimes(1);
        expect(Logger.error).toHaveBeenCalledTimes(1);
        expect(RequestValidator.validateRoadMapRequest).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledWith({
            title: 'ERRO!',
            code: 404,
            error: errorMessage
        });
    });
});
