"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger")); // Winston yapılandırmasını dahil edin
// Loglama middleware'i
const logMiddleware = (req, res, next) => {
    const startTime = Date.now();
    // logger.info(`Request: ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`);
    const reqData = (`Request: ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`);
    let resData = undefined;
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        resData = (`Response: ${req.method} ${req.url} - Status: ${res.statusCode} - Duration: ${duration}ms`);
        logger_1.default.info({ request: reqData, response: resData });
    });
    next();
};
exports.default = logMiddleware;
