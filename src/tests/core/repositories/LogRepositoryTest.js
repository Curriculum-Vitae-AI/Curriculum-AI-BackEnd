import LogEntity from '../../../core/domain/entities/LogEntity.js';
import LogRepository from '../../../core/repositories/LogRepository';

jest.mock('../../../core/domain/entities/LogEntity.js');
jest.mock('../../../core/utils/log/Logger.js', () => ({}));

describe('LogRepository', () => {
    const logRepository = new LogRepository();

    it('Should return created log entity', async () => {
        const logEntity = {
            id: 1,
            request: {
                message: 'Test'
            },
            response: {
                message: 'Test'
            },
            service: 'ROADMAP',
            date: new Date()
        };
        LogEntity.create.mockResolvedValue(logEntity);
        const response = await logRepository.save(logEntity);
        expect(response).toBe(logEntity);
    });
});
