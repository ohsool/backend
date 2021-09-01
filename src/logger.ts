import winston, { createLogger, transports, format } from 'winston';
import WinstonCloudWatch from "winston-cloudwatch";
const { combine, timestamp, printf, colorize } = winston.format;

interface TransformableInfo {
    level: string;
    message: string;
    [key: string]: any;
}

// Define log format
const logFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.label({ label: '[my-server]' }),
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.colorize(),
                format.printf((info: TransformableInfo) => `${info.timestamp} - ${info.level}: ${info.label} ${info.message}`),
            )
        }),
    ],
});

if (process.env.NODE_ENV === 'development') {
    const cloudwatchConfig = {
        name: String(process.env.CLOUDWATCH_GROUP_NAME),
        logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
        logStreamName: `${process.env.CLOUDWATCH_GROUP_NAME}-${process.env.NODE_ENV}`,
        awsAccessKeyId: process.env.CLOUDWATCH_ACCESS_KEY,
        awsSecretKey: process.env.CLOUDWATCH_SECRET_ACCESS_KEY,
        awsRegion: process.env.CLOUDWATCH_REGION,
        createLogGroup: true,
        createLogStream: true,
    }
    logger.add(new WinstonCloudWatch(cloudwatchConfig))
}
console.log(`${process.env.CLOUDWATCH_GROUP_NAME}-${process.env.NODE_ENV}`)

export class LoggerStream {
    write(message: string) {
        logger.info(message.substring(0, message.lastIndexOf('\n')));
    }
}


export { logger };