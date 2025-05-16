import logger from './logger.js'; // Winston yapılandırmasını dahil edin
// Loglama middleware'i
const logMiddleware = (req, res, next) => {
    const startTime = Date.now();
    // logger.info(`Request: ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}`);
    const reqData = (`Request: ${req.method} ${req.url} - Body: ${JSON.stringify(req.body)}, - User: ${req.session.username}`);
    let resData = undefined;
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        resData = (`Response: ${req.method} ${req.url} - Status: ${res.statusCode} - Duration: ${duration}ms`);
        logger.info({ request: reqData, response: resData });
    });
    next();
};
export default logMiddleware;
