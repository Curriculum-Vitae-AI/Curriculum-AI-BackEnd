import Logger from '../../../../core/utils/log/Logger.js';
import LogService from '../../../../core/services/log/LogService.js';
import VacancyService from '../../../../core/services/vacancy/VacancyService.js';
import GeminiService from '../../../../core/services/gemini/GeminiService.js';

jest.mock('../../../../core/utils/log/Logger.js', () => ({
    start: jest.fn(),
    finish: jest.fn(),
    info: jest.fn(),
    error: jest.fn()
}));
jest.mock('../../../../core/services/log/LogService.js');
jest.mock('../../../../core/services/gemini/GeminiService.js');

describe('VacancyService', () => {
    const vacancyService = new VacancyService();
    it('Should requestVacancyLinks from request', async () => {
        const expected = {code: 200, response: 'Test'};
        GeminiService.prototype.getVacancyLinks.mockResolvedValue(expected);
        const response = await vacancyService.requestVacancyLinks('request');
        expect(response).toBe(expected);
        expect(Logger.start).toHaveBeenCalledTimes(1);
        expect(Logger.finish).toHaveBeenCalledTimes(1);
        expect(Logger.info).toHaveBeenCalledTimes(2);
    });
    it('Should throw exception when error happens', async () => {
        LogService.prototype.createLog.mockImplementation(() => {
            throw new Error();
        });
        await expect(vacancyService.requestVacancyLinks('request')).rejects.toThrow();
        expect(Logger.start).toHaveBeenCalledTimes(1);
        expect(Logger.finish).toHaveBeenCalledTimes(1);
        expect(Logger.info).toHaveBeenCalledTimes(1);
        expect(Logger.error).toHaveBeenCalledTimes(1);
    });
});
