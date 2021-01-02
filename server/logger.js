const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const { combine, timestamp, printf } = winston.format;

const customFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        customFormat,
    ),
    transports: [
        new winston.transports.Console(),

        new winstonDaily({
            level: 'debug',
            datePattern: 'YYYYMMDD',
            dirname: './logs',
            filename: `JIDUCKCHAE_%DATE%.log`,
            maxSize: '10m',
            showlevel: true,
            maxFiles: '14d'
        }),
    ],
});

const stream = {
    write: message => {
      logger.debug(message)
    }
}

module.exports = { logger, stream };