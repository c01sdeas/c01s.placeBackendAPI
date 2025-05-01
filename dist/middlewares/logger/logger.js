"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, json } = winston_1.format;
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(timestamp(), // Loglara zaman damgası ekleyin
    json() // Logları JSON formatında tutun
    ),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: 'logs/allLogs.json' }),
        new winston_1.transports.File({ filename: 'logs/error.json', level: 'error' }),
    ]
});
exports.default = logger;
