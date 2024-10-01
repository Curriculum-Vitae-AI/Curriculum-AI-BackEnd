import MotivationLetterService from '../../services/motivation-letter/MotivationLetterService.js';
import Logger from '../../utils/log/Logger.js';
import RequestValidator from '../../domain/validators/RequestValidator.js';

import dotenv from 'dotenv';

dotenv.config({ path: './src/config/app.env' });
const baseEndpoint = `/${process.env.CONTROL_VERSION}/motivation-letter`;
const motivationLetterService = new MotivationLetterService();

export const createMotivationLetter = async (request, response) => {
    const endpoint = baseEndpoint + '/create';
    Logger.controller(endpoint);
    try {
        const body = request.body;
        RequestValidator.validateMotivationLetterRequest(body);
        response.status(200).json(await motivationLetterService.generateMotivationLetter(body));
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
