import { createRoadMap } from '../../core/controllers/roadmap/RoadMapController.js';

import express from 'express';

const roadMapRouter = express.Router();
roadMapRouter.post('/create', createRoadMap);

export default roadMapRouter;
