const logger = require('electron-log');
const {join} = require("path");
const fs = require("fs");
const {environment} = require("../environments/environment");
const path = require("path");
const {homedir} = require("os");
let LOG_PATH = path.join(homedir(), 'AppData', 'Roaming', 'ticktrack-app', 'logs');
if (!environment.production) LOG_PATH = path.join(__dirname, '..', 'logs');

try {
    if (!fs.existsSync(LOG_PATH)) fs.mkdirSync(LOG_PATH);
    logger.transports.file.resolvePath = () => join(LOG_PATH, `${new Date().toISOString().split('T')[0]}_app.log`);
    logger.transports.console.format = '{y}-{m}-{d} {h}:{i}:{s}.{ms} | {level} | {text}';
} catch (e) {
    console.error("Could not init electron logger: " + e.message);
}

const log = (message, logLevel, isMainProcess) => {
    let process = isMainProcess ? 'Main Process    ' : 'Renderer Process';
    let output = `${process} | ${message}`

    try {
        switch (logLevel) {
            case 0:
                logger.debug(output)
                break;
            case 1:
                logger.info(output)
                break;
            case 2:
                logger.warn(output)
                break;
            case 3:
                logger.debug(output)
                break;
            case 4:
                logger.error(output)
                break;
            case 5:
                logger.error(output)
                break;
            case 6:
                logger.info(output)
                break;
            case 7:
                logger.info(output)
                break;
            default:
                logger.info(output)
                break;
        }
    } catch (e) {
        console.error("Could not log message: " + e.message);
    }
}

const rendererProcessLog = (message, logLevel) => log(message, logLevel, false);
const debug = (message) => log(message, 0, true)
const info = (message) => log(message, 1, true)
const warn = (message) => log(message, 2, true)
const trace = (message) => log(message, 3, true)
const error = (message) => log(message, 4, true)
const fatal = (message) => log(message, 5, true)
const time = (message) => log(message, 6, true)
const timeEnd = (message) => log(message, 7, true)

console.log = info;
console.debug = debug;
console.info = info;
console.warn = warn;
console.error = error;


function deleteLogsOlderThan(days) {
    fs.readdir(LOG_PATH, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }

        const currentDate = new Date();

        files.forEach(file => {
            const filePath = path.join(LOG_PATH, file);
            const fileDateString = file.split('_')[0];

            const fileDate = new Date(fileDateString);
            const diffTime = Math.abs(currentDate - fileDate);
            const diffDays = (Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1);

            if (diffDays > days) {
                fs.unlink(filePath, err => {
                    if (err) console.error(err);
                    console.log(`Deleted ${filePath}`);
                });
            }
        });
    });
}

// deleteLogsOlderThan(30);


module.exports = {
    debug,
    info,
    warn,
    trace,
    error,
    fatal,
    time,
    timeEnd,
    rendererProcessLog
};
