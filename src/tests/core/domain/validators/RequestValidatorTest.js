import ApiException from '../../../../core/domain/exceptions/ApiException.js';
import RequestValidator from '../../../../core/domain/validators/RequestValidator.js';

describe('validateRoadMapRequest', () => {
    it('Should throw exception when request job does not exists.', () => {
        const request = {}
        expect(() => RequestValidator.validateRoadMapRequest(request)).toThrow(ApiException);
    });
    it('Should throw exception when request job exists but is empty.', () => {
        const request = {job: ''}
        expect(() => RequestValidator.validateRoadMapRequest(request)).toThrow(ApiException);
    });
    it('Should not throw exception when request job exists and is not empty.', () => {
        const request = {job: 'Test'}
        expect(() => RequestValidator.validateRoadMapRequest(request)).not.toThrow(ApiException);
    });
});
