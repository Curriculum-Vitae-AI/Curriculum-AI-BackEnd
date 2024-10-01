import LogRepository from '../../../../core/repositories/LogRepository.js';
import LogService from '../../../../core/services/log/LogService';
import Logger from '../../../../core/utils/log/Logger.js';

jest.mock('../../../../core/repositories/LogRepository.js');
jest.mock('../../../../core/utils/log/Logger.js', () => ({
    start: jest.fn(),
    finish: jest.fn(),
    info: jest.fn(),
    error: jest.fn()
}));

describe('LogService', () => {
    const logService = new LogService();
    it('Should return repository saved entity', async () => {
        const expected = { response: 'test' };
        LogRepository.prototype.save.mockResolvedValue(expected);
        const response = await logService.createLog('req', 'resp', 'svc');
        expect(response).toBe(expected);
        expect(Logger.start).toHaveBeenCalledTimes(1);
        expect(Logger.finish).toHaveBeenCalledTimes(1);
        expect(Logger.info).toHaveBeenCalledTimes(2);
    })
    it('Should throw exception when error happens', async () => {
        LogRepository.prototype.save.mockImplementation(() => {
            throw new Error();
        });
        await expect(logService.createLog('req', 'resp', 'svc')).rejects.toThrow();
        expect(Logger.start).toHaveBeenCalledTimes(1);
        expect(Logger.finish).toHaveBeenCalledTimes(1);
        expect(Logger.info).toHaveBeenCalledTimes(1);
        expect(Logger.error).toHaveBeenCalledTimes(1);
    })
})