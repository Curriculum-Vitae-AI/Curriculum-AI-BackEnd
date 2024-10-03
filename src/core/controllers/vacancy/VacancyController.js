import VacancyService from '../../services/vacancy/VacancyService.js';
import Logger from '../../utils/log/Logger.js';
import RequestValidator from '../../domain/validators/RequestValidator.js';

import dotenv from 'dotenv';

dotenv.config({ path: './src/config/app.env' });
const baseEndpoint = `/${process.env.CONTROL_VERSION}/vacancy`;
const vacancyService = new VacancyService();

export const findVacancyLinks = async (request, response) => {
    const endpoint = baseEndpoint + '/find';
    Logger.controller(endpoint);
    try {
        const body = request.body;
        RequestValidator.validateVacancyRequest(body);
        response.status(200).json(await vacancyService.requestVacancyLinks(body));
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
