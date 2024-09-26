import { Router } from 'express';

import { LogService } from '../core/services/log/LogService.js';

const appRouter = Router();
const logService = new LogService();

appRouter.get('/', async (_req, res) => {
    const logEntity = await logService.createLog(
      {'teste': 'teste'},
      {'teste': 'teste'},
      'CARTA_DE_MOTIVACAO'
    );
    res.send(logEntity);
});

export default appRouter;
