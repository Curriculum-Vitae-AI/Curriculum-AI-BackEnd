import Logger from '../../../../core/utils/log/Logger.js';
import LogService from '../../../../core/services/log/LogService.js';
import MotivationLetterService from '../../../../core/services/motivation-letter/MotivationLetterService.js';
import PdfService from '../../../../core/services/pdf/PdfService.js';

jest.mock('../../../../core/utils/log/Logger.js', () => ({
    start: jest.fn(),
    finish: jest.fn(),
    info: jest.fn(),
    error: jest.fn()
}));
jest.mock('../../../../core/services/log/LogService.js');
jest.mock('../../../../core/services/pdf/PdfService.js');

describe('MotivationLetterService', () => {
    const motivationLetterService = new MotivationLetterService();
    it('Should generateMotivationLetter from request', async () => {
        const expected = 'result';
        PdfService.prototype.generateMotivationLetterPdf.mockResolvedValue(expected);
        const response = await motivationLetterService.generateMotivationLetter('request');
        expect(response).toBe(expected);
        expect(Logger.start).toHaveBeenCalledTimes(1);
        expect(Logger.finish).toHaveBeenCalledTimes(1);
        expect(Logger.info).toHaveBeenCalledTimes(2);
    });
    it('Should throw exception when error happens', async () => {
        LogService.prototype.createLog.mockImplementation(() => {
            throw new Error();
        });
        await expect(motivationLetterService.generateMotivationLetter('request')).rejects.toThrow();
        expect(Logger.start).toHaveBeenCalledTimes(1);
        expect(Logger.finish).toHaveBeenCalledTimes(1);
        expect(Logger.info).toHaveBeenCalledTimes(1);
        expect(Logger.error).toHaveBeenCalledTimes(1);
    });
});
