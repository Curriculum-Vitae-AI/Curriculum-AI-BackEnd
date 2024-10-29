import Logger from '../../../../core/utils/log/Logger.js';
import LogService from '../../../../core/services/log/LogService.js';
import RoadMapService from '../../../../core/services/roadmap/RoadMapService.js';
import PdfService from '../../../../core/services/pdf/PdfService.js';
import GeminiService from '../../../../core/services/gemini/GeminiService.js';

jest.mock('../../../../core/utils/log/Logger.js', () => ({
    start: jest.fn(),
    finish: jest.fn(),
    info: jest.fn(),
    error: jest.fn()
}));
jest.mock('../../../../core/services/log/LogService.js');
jest.mock('../../../../core/services/pdf/PdfService.js');
jest.mock('../../../../core/services/gemini/GeminiService.js');

describe('RodMapService', () => {
    const roadMapService = new RoadMapService();
    it('Should generateRoadMap from request', async () => {
        const expected = 'result';
        GeminiService.prototype.getRoadMapBody.mockResolvedValue({ code: 200, response: 'test' });
        PdfService.prototype.generateRoadMapPdf.mockResolvedValue(expected);
        const response = await roadMapService.generateRoadmap('request');
        expect(response).toBe(expected);
        expect(Logger.start).toHaveBeenCalledTimes(1);
        expect(Logger.finish).toHaveBeenCalledTimes(1);
        expect(Logger.info).toHaveBeenCalledTimes(2);
    });
    it('Should throw exception when error happens', async () => {
        LogService.prototype.createLog.mockImplementation(() => {
            throw new Error();
        });
        await expect(roadMapService.generateRoadmap('request')).rejects.toThrow();
        expect(Logger.start).toHaveBeenCalledTimes(1);
        expect(Logger.finish).toHaveBeenCalledTimes(1);
        expect(Logger.info).toHaveBeenCalledTimes(1);
        expect(Logger.error).toHaveBeenCalledTimes(1);
    });
});
