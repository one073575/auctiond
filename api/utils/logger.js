import winston from 'winston'

const consoleTransport = new winston.transports.Console()

winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    debug: 'green',
})

const winstonOpts = {
    transports: [consoleTransport],
    format: winston.format.combine(
        winston.format.label({
            label: `Label`,
        }),
        winston.format.timestamp({
            format: 'MMM-DD-YY HH:mm:ss',
        }),
        winston.format.printf(
            (info) =>
                `${info.level}: ${info.label}: ${[info.timestamp]}: ${
                    info.message
                }`
        ),
        winston.format.colorize()
    ),
}

const logger = winston.createLogger(winstonOpts)

export default logger
