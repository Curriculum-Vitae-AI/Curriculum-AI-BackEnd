import LogEntity from '../domain/entities/LogEntity.js';

export default class LogRepository {
    async save(logEntity) {
        return LogEntity.create(logEntity);
    }
}
