const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const inviteRegex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(\.gg|(app)?\.com\/invite|\.me)\/([^ ]+)\/?/gi;
const botInvRegex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(app)?\.com\/(api\/)?oauth2\/authorize\?([^ ]+)\/?/gi;


/**
 * Class that hold common util methods.
 */
module.exports = class Util {

	/**
	 * Delay a Promise
	 * @param {*} ms the time in milliseconds
	 * @returns a delayed Promise
	 */
	static delay(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	/**
	 * Shuffle an array
	 * @param {*} array the array to shuffle
	 * @returns the shuffled array
	 */
	static shuffle(array) {
		const arr = array.slice(0);
		for (let i = arr.length - 1; i >= 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
		return arr;
	}

	/**
	 * Roll a dice
	 * @returns a random number between 1 and 6
	 */
	static rollDice() {
		return Math.floor(Math.random() * 6) + 1;
	}

	/**
	 * Convert to title case
	 * @param {*} str the string to convert
	 * @returns the converted string
	 */
	static toTitleCase(str) {
		return str.replace(/\w\S*/g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}

	/**
	 * Create a list
	 * @param {*} arr the array to create the list from
	 * @param {*} conj the conjunction to use between the items
	 * @returns the list
	 */
	static list(arr, conj = 'and') {
		const len = arr.length;
		if (len === 0) return '';
		if (len === 1) return arr[0];
		return `${arr.slice(0, -1).join(', ')}${
			len > 1 ? `${len > 2 ? ',' : ''} ${conj} ` : ''
		}${arr.slice(-1)}`;
	}

	/**
	 * Shorten a string to a certain length
	 * @param {*} text the string to shorten
	 * @param {*} maxLen the maximum length of the string
	 * @returns the shortened string
	 */
	static shorten(text, maxLen = 2000) {
		return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
	}

	/**
	 * Return a random number between min and max
	 * @param {*} min the minimum number
	 * @param {*} max the maximum number
	 * @returns the random number
	 */
	static randomRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * Trim an array to a certain length
	 * @param {*} arr the array to trim
	 * @param {*} maxLen the maximum length of the array
	 * @returns the trimmed array
	 */
	static trimArray(arr, maxLen = 10) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	}

	/**
	 * Remove duplicate elements from an array
	 * @param {*} arr the array to remove duplicates from
	 * @returns the array without duplicates
	 */
	static removeDuplicates(arr) {
		if (arr.length === 0 || arr.length === 1) return arr;
		const newArr = [];
		for (let i = 0; i < arr.length; i++) {
			if (newArr.includes(arr[i])) continue;
			newArr.push(arr[i]);
		}
		return newArr;
	}

	/**
	 * Sort by name
	 * @param {*} arr the array to sort
	 * @param {*} prop the property to sort by
	 * @returns the sorted array
	 */
	static sortByName(arr, prop) {
		return arr.sort((a, b) => {
			if (prop) {
				return a[prop].toLowerCase() > b[prop].toLowerCase() ? 1 : -1;
			}
			return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
		});
	}

	/**
	 * Return the first upper case character of a string
	 * @param {*} text the string to get the first upper case character from
	 * @param {*} split the character to split the string on
	 * @returns the first upper case character
	 */
	static firstUpperCase(text, split = ' ') {
		return text
			.split(split)
			.map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
			.join(' ');
	}

	/**
	 * Format a number to a certain number of decimal places
	 * @param {*} number the number to format
	 * @param {*} minimumFractionDigits the minimum number of fraction digits
	 * @returns the formatted number
	 */
	static formatNumber(number, minimumFractionDigits = 0) {
		return Number.parseFloat(number).toLocaleString(undefined, {
			minimumFractionDigits,
			maximumFractionDigits: 2,
		});
	}

	/**
	 * Format a number to a certain number of decimal places
	 * @param {*} number the number to format
	 * @returns the formatted number
	 */
	static formatNumberK(number) {
		return number > 999
			? `${(number / 1000).toLocaleString(undefined, {
				maximumFractionDigits: 1,
			})}K`
			: number;
	}

	/**
	 * Return a base64 encoded string
	 * @param {*} text the string to encode
	 * @param {*} mode the encoding mode
	 * @returns the base64 encoded string
	 */
	static base64(text, mode = 'encode') {
		if (mode === 'encode') return Buffer.from(text).toString('base64');
		if (mode === 'decode') {
			return Buffer.from(text, 'base64').toString('utf8') || null;
		}
		throw new TypeError(`${mode} is not a supported base64 mode.`);
	}

	/**
	 * Return a hash of a string
	 * @param {*} text the string to hash
	 * @param {*} algorithm the hashing algorithm
	 * @returns the hash
	 */
	static hash(text, algorithm) {
		return crypto.createHash(algorithm).update(text).digest('hex');
	}

	/**
	 * Convert a stream to a array buffer
	 * @param {*} stream the stream to convert
	 * @returns the array buffer
	 */
	static streamToArray(stream) {
		if (!stream.readable) return Promise.resolve([]);
		return new Promise((resolve, reject) => {
			const array = [];
			function onData(data) {
				array.push(data);
			}
			function onEnd(error) {
				if (error) reject(error);
				else resolve(array);
				cleanup();
			}
			function onClose() {
				resolve(array);
				cleanup();
			}
			function cleanup() {
				stream.removeListener('data', onData);
				stream.removeListener('end', onEnd);
				stream.removeListener('error', onEnd);
				stream.removeListener('close', onClose);
			}
			stream.on('data', onData);
			stream.on('end', onEnd);
			stream.on('error', onEnd);
			stream.on('close', onClose);
		});
	}

	/**
	 * Return a percentage of a color
	 * @param {*} pct the percentage
	 * @param {*} percentColors the colors to use
	 * @returns the color
	 */
	static percentColor(pct, percentColors) {
		let i = 1;
		for (i; i < percentColors.length - 1; i++) {
			if (pct < percentColors[i].pct) {
				break;
			}
		}
		const lower = percentColors[i - 1];
		const upper = percentColors[i];
		const range = upper.pct - lower.pct;
		const rangePct = (pct - lower.pct) / range;
		const pctLower = 1 - rangePct;
		const pctUpper = rangePct;
		const color = {
			r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper)
				.toString(16)
				.padStart(2, '0'),
			g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper)
				.toString(16)
				.padStart(2, '0'),
			b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
				.toString(16)
				.padStart(2, '0'),
		};
		return `#${color.r}${color.g}${color.b}`;
	}

	/**
	 * Return todays date
	 * @param {*} timeZone the time zone to use
	 * @returns the date
	 */
	static today(timeZone) {
		const now = new Date();
		now.setHours(0);
		now.setMinutes(0);
		now.setSeconds(0);
		now.setMilliseconds(0);
		if (timeZone) now.setUTCHours(now.getUTCHours() + timeZone);
		return now;
	}

	/**
	 * Return tomorrow's date
	 * @param {*} timeZone the time zone to use
	 * @returns the date
	 */
	static tomorrow(timeZone) {
		const today = Util.today(timeZone);
		today.setDate(today.getDate() + 1);
		return today;
	}

	/**
	 * Return a embed url
	 * @param {*} title the title of the embed
	 * @param {*} url the url of the embed
	 * @param {*} display the display of the embed
	 * @returns the url
	 */
	static embedURL(title, url, display) {
		return `[${title}](${url.replace(/\)/g, '%27')}${
			display ? ` "${display}"` : ''
		})`;
	}

	/**
	 * Strip invites from a string
	 * @param {*} str the string to strip
	 * @param {*} param1 the options
	 * @returns the stripped string
	 */
	static stripInvites(
		str,
		{ guild = true, bot = true, text = '[redacted invite]' } = {},
	) {
		if (guild) str = str.replace(inviteRegex, text);
		if (bot) str = str.replace(botInvRegex, text);
		return str;
	}

	/**
	 * Clean a AniList object
	 * @param {*} html the html to clean
	 * @param {*} removeLineBreaks remove line breaks
	 * @returns the cleaned html
	 */
	static cleanAnilistHTML(html, removeLineBreaks = true) {
		let clean = html;
		if (removeLineBreaks) clean = clean.replace(/\r|\n|\f/g, '');
		clean = clean
			.replace(/<br>/g, '\n')
			.replace(/&#039;/g, '\'')
			.replace(/&quot;/g, '"')
			.replace(/<\/?i>/g, '*')
			.replace(/<\/?b>/g, '**')
			.replace(/~!|!~/g, '||')
			.replace(/&mdash;/g, '—');
		if (clean.length > 2000) clean = `${clean.substr(0, 1995)}...`;
		const spoilers = (clean.match(/\|\|/g) || []).length;
		if (spoilers !== 0 && spoilers && spoilers % 2) clean += '||';
		return clean;
	}

	/**
	 * Return all the files in a directory
	 * @param {*} dirPath the directory to search
	 * @param {*} arrayOfFiles the array to add the files to
	 * @param {*} fileType the file type to search for
	 * @returns an array of files
	 */
	static getAllFiles(dirPath, arrayOfFiles, fileType) {
		const type = fileType || '.js';
		const files = fs.readdirSync(dirPath);
		arrayOfFiles = arrayOfFiles || [];

		files.forEach(function(file) {
			if (fs.statSync(dirPath + '/' + file).isDirectory()) {
				arrayOfFiles = Util.getAllFiles(dirPath + '/' + file, arrayOfFiles);
			} else {
				arrayOfFiles.push(path.join('', dirPath, file));
			}
		});

		return arrayOfFiles;
	}
};
