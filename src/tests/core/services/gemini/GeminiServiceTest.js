import GeminiService from '../../../../core/services/gemini/GeminiService.js';
import Logger from '../../../../core/utils/log/Logger.js';
import GeminiResponseValidator from '../../../../core/domain/validators/GeminiResponseValidator.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

jest.mock('@google/generative-ai');
jest.mock('../../../../core/utils/log/Logger.js');
jest.mock('../../../../core/domain/validators/GeminiResponseValidator.js');

jest.mock('../../../../core/utils/log/Logger.js', () => ({
    start: jest.fn(),
    finish: jest.fn(),
    info: jest.fn(),
    error: jest.fn()
}));

describe('GeminiService', () => {
    let geminiService;
    let mockChatSession;

    beforeEach(() => {
        mockChatSession = {
            sendMessage: jest.fn().mockResolvedValue({
                response: {
                    text: jest.fn().mockReturnValue('{"success":true}')
                }
            })
        };

        GoogleGenerativeAI.mockImplementation(() => ({
            getGenerativeModel: jest.fn().mockReturnValue({
                startChat: jest.fn().mockReturnValue(mockChatSession)
            })
        }));

        geminiService = new GeminiService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('getMotivationLetterBody', async () => {
        const request = { message: 'Test' };

        const result = await geminiService.getMotivationLetterBody(request);

        expect(GoogleGenerativeAI).toHaveBeenCalledWith(process.env.GEMINI_KEY);
        expect(mockChatSession.sendMessage).toHaveBeenCalledWith(request);
        expect(Logger.start).toHaveBeenCalledWith('getMotivationLetterBody');
        expect(Logger.info).toHaveBeenCalledWith('getMotivationLetterBody', expect.any(String));
        expect(GeminiResponseValidator.validateGeminiResponse).toHaveBeenCalledWith({ success: true });
        expect(result).toEqual({ success: true });
        expect(Logger.finish).toHaveBeenCalledWith('getMotivationLetterBody');
    });

    it('getMotivationLetterBody exception', async () => {
        const request = { message: 'Test' };
        const error = new Error('Test Error');
        mockChatSession.sendMessage.mockRejectedValue(error);

        await expect(geminiService.getMotivationLetterBody(request)).rejects.toThrow(error);

        expect(Logger.error).toHaveBeenCalledWith('getMotivationLetterBody', error);
    });

    it('getVacancyLinks', async () => {
        const request = { message: 'Test' };

        const result = await geminiService.getVacancyLinks(request);

        expect(GoogleGenerativeAI).toHaveBeenCalledWith(process.env.GEMINI_KEY);
        expect(mockChatSession.sendMessage).toHaveBeenCalledWith(request);
        expect(Logger.start).toHaveBeenCalledWith('getVacancyLinks');
        expect(Logger.info).toHaveBeenCalledWith('getVacancyLinks', expect.any(String));
        expect(GeminiResponseValidator.validateGeminiResponse).toHaveBeenCalledWith({ success: true });
        expect(result).toEqual({ success: true });
        expect(Logger.finish).toHaveBeenCalledWith('getVacancyLinks');
    });

    it('getVacancyLinks exception', async () => {
        const request = { message: 'Test' };
        const error = new Error('Test Error');
        mockChatSession.sendMessage.mockRejectedValue(error);

        await expect(geminiService.getVacancyLinks(request)).rejects.toThrow(error);

        expect(Logger.error).toHaveBeenCalledWith('getVacancyLinks', error);
    });
});
