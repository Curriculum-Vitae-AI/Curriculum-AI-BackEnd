import RoadMapService from '../../services/roadmap/RoadMapService.js';
import Logger from '../../utils/log/Logger.js';
import RequestValidator from '../../domain/validators/RequestValidator.js';

import dotenv from 'dotenv';

dotenv.config({ path: './src/config/app.env' });
const baseEndpoint = `/${process.env.CONTROL_VERSION}/roadmap`;
const roadMapService = new RoadMapService();

export const createRoadMap = async (request, response) => {
    const endpoint = baseEndpoint + '/create';
    Logger.controller(endpoint);
    try {
        const body = request.body;
        RequestValidator.validateRoadMapRequest(body);
        response.status(200).json(await roadMapService.generateRoadmap(body));
    } catch (exception) {
        Logger.error(endpoint, exception);
        const statusCode = exception.status || 500;
        response
            .status(statusCode)
            .json({
                title: 'ERRO!',
                code: statusCode,
                error: exception.message || 'Ocorreu um erro inesperado.'
            });
    }
};

