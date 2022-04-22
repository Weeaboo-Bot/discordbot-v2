const chalk = require('chalk');

module.exports = {
	info: (message) => console.log(chalk.blue('[INFO]') + ' ' + message),
	warn: (message) => console.log(chalk.yellow('[WARN]') + ' ' + message),
	error: (message) => console.log(chalk.red('[ERROR]') + ' ' + message),
	success: (message) => console.log(chalk.green('[SUCCESS]') + ' ' + message),
	debug: (message) => console.log(chalk.magenta('[DEBUG]') + ' ' + message),
	log: (message) => console.log(chalk.white('[LOG]') + ' ' + message),
};
