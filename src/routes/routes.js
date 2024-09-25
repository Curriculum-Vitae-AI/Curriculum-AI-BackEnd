import { Router } from 'express';

import LogEntity from '../core/domain/entities/log.js';

const router = Router();

// TESTANDO CRIAÇÃO DE NOVA ENTIDADE
router.get('/', async (req, res) => {
    const logEntity = await LogEntity.create({
        request: {
            requestTest: 'request'
        },
        response: {
            responseTest: 'response'
        },
        service: 'ROADMAP',
        date: new Date()
    });
    res.send(logEntity);
});

export default router;