import chalk from 'chalk';

export default class Logger {

    static start(methodName) {
        console.log(chalk.magenta('[START] ') + `Iniciando o método ${methodName}...`);
    }

    static finish(methodName) {
        console.log(chalk.magenta('[FINISH] ') + `Método ${methodName} finalizado.`);
    }

    static info(methodName, message) {
        console.log(chalk.blue('[INFO] ') + `(${methodName}): ${message}`);
    }

    static error(methodName, exception) {
        console.log(chalk.red('[ERROR] ') + `Ocorreu um erro ao processar ${methodName}. ${exception}`);
    }

    static app(message) {
        console.log(chalk.yellow('[APP] ') + message);
    }

    static controller(endpoint) {
        console.log(chalk.rgb(255, 192, 203)('[CONTROLLER] ') + `Chamada recebida para o endpoint: ${endpoint}`);
    }
}
