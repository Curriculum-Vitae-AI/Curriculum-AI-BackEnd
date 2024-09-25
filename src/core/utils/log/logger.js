import chalk from 'chalk';

export class Logger {

    static start(methodName) {
        console.log(chalk.magenta('[START] ') + `Iniciando o método ${methodName}...`);
    }

    static finish(methodName) {
        console.log(chalk.magenta('[FINISH] ') + `Método ${methodName} finalizado.`);
    }

    static info(methodName, message) {
        console.log(chalk.blue('[INFO] ') + `(${methodName}): ${message}`);
    }

    static info(message) {
        console.log(chalk.blue('[INFO] ') + `${message}`);
    }

    static error(methodName, exception) {
        console.log(chalk.red('[ERROR] ') + `Ocorreu um erro ao processar o método ${methodName}: ${exception}`)
    }

    static app(message) {
        console.log(chalk.yellow('[APP] ') + message);
    }
}