const chalk = require('chalk');

module.exports = {
	info: (message) => console.info(chalk.blue('[INFO]') + ' ' + message),
	commandLog: (message) => console.info(chalk.cyan('[COMMAND]') + ' ' + message),
	commandExecute: (message) => console.info(chalk.green('[COMMAND EXECUTE]') + ' ' + message),
	eventLog: (message) => console.info(chalk.magentaBright('[EVENT]') + ' ' + message),
	messageLog: (message) => console.info(chalk.yellowBright('[MESSAGE]') + ' ' + message),
	warn: (message) => console.log(chalk.yellow('[WARN]') + ' ' + message),
	error: (message) => console.log(chalk.red('[ERROR]') + ' ' + message),
	success: (message) => console.log(chalk.green('[SUCCESS]') + ' ' + message),
	debug: (message) => console.log(chalk.magenta('[DEBUG]') + ' ' + message),
	log: (message) => console.log(chalk.white('[LOG]') + ' ' + message),
};
