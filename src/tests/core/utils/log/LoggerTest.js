import Logger from '../../../../core/utils/log/Logger';

global.console = {
    log: jest.fn()
};

jest.mock('chalk', () => {
    return {
        magenta: jest.fn(str => str),
        blue: jest.fn(str => str),
        red: jest.fn(str => str),
        yellow: jest.fn(str => str),
        rgb: jest.fn(() => jest.fn(str => str))
    };
});

describe('Logger', () => {
    it('Should log start message', () => {
        Logger.start('test');
        expect(console.log).toHaveBeenCalledWith('[START] Iniciando o método test...');
    });
    it('Should log finish message', () => {
        Logger.finish('test');
        expect(console.log).toHaveBeenCalledWith('[FINISH] Método test finalizado.');
    });
    it('Should log info message', () => {
        Logger.info('test', 'this is a test');
        expect(console.log).toHaveBeenCalledWith('[INFO] (test): this is a test');
    });
    it('Should log error message', () => {
        Logger.error('test', 'this is a test');
        expect(console.log).toHaveBeenCalledWith('[ERROR] Ocorreu um erro ao processar test. this is a test');
    });
    it('Should log app message', () => {
        Logger.app('test');
        expect(console.log).toHaveBeenCalledWith('[APP] test');
    });
    it('Should log controller message', () => {
        Logger.controller('test');
        expect(console.log).toHaveBeenCalledWith('[CONTROLLER] Chamada recebida para o endpoint: test');
    });
});
