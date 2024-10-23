import ApiException from '../../../../core/domain/exceptions/ApiException.js';
import RequestValidator from '../../../../core/domain/validators/RequestValidator.js';

describe('validateRoadMapRequest', () => {
    it('Should throw exception when request job does not exists.', () => {
        const request = {};
        expect(() => RequestValidator.validateRoadMapRequest(request)).toThrow(ApiException);
    });
    it('Should not throw exception when request job exists and is not empty.', () => {
        const request = {job: 'Test'};
        expect(() => RequestValidator.validateRoadMapRequest(request)).not.toThrow(ApiException);
    });
});

describe('validateMotivationLetterRequest', () => {
    it('Should throw exception when request company does not exists.', () => {
        const request = {};
        expect(() => RequestValidator.validateMotivationLetterRequest(request)).toThrow(ApiException);
    });
    it('Should throw exception when request role does not exists.', () => {
        const request = {company: 'test'};
        expect(() => RequestValidator.validateMotivationLetterRequest(request)).toThrow(ApiException);
    });
    it('Should throw exception when request experience does not exists.', () => {
        const request = {company: 'test', role: 'test'};
        expect(() => RequestValidator.validateMotivationLetterRequest(request)).toThrow(ApiException);
    });
    it('Should not throw exception when request is valid.', () => {
        const request = {company: 'test', role: 'test', experience: 'test'};
        expect(() => RequestValidator.validateMotivationLetterRequest(request)).not.toThrow(ApiException);
    });
});

describe('validateVacancyRequest', () => {
    it('Should throw exception when request role does not exists.', () => {
        const request = {};
        expect(() => RequestValidator.validateVacancyRequest(request)).toThrow(ApiException);
    });
    it('Should throw exception when request locality does not exists.', () => {
        const request = {role: 'test'};
        expect(() => RequestValidator.validateVacancyRequest(request)).toThrow(ApiException);
    });
    it('Should throw exception when request seniority does not exists.', () => {
        const request = {role: 'test', locality: 'test'};
        expect(() => RequestValidator.validateVacancyRequest(request)).toThrow(ApiException);
    });
    it('Should not throw exception when request is valid.', () => {
        const request = {role: 'test', locality: 'test', seniority: 'test', additional_informations: 'test'};
        expect(() => RequestValidator.validateVacancyRequest(request)).not.toThrow(ApiException);
    });
});
