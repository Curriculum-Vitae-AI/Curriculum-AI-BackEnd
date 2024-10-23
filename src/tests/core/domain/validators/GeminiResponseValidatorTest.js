import GeminiResponseValidator from '../../../../core/domain/validators/GeminiResponseValidator.js';
import ApiException from '../../../../core/domain/exceptions/ApiException.js';

describe('validateGeminiResponse', () => {
    it ('should throw exception when code is 400', () => {
        expect(() => GeminiResponseValidator.validateGeminiResponse({ code: '400' })).toThrow(ApiException);
    });
    it ('should throw exception when response length is 0', () => {
        expect(() => GeminiResponseValidator.validateGeminiResponse({ code: '200', response: '' })).toThrow(ApiException);
    });
    it ('should throw exception when code does not exists', () => {
        expect(() => GeminiResponseValidator.validateGeminiResponse({ response: 'Test' })).toThrow(ApiException);
    });
    it ('should throw exception when response does not exists', () => {
        expect(() => GeminiResponseValidator.validateGeminiResponse({ code: '200' })).toThrow(ApiException);
    });
    it ('should not throw exception when response is valid', () => {
        expect(() => GeminiResponseValidator.validateGeminiResponse({ code: '200', response: 'Test' })).not.toThrow();
    });
});
