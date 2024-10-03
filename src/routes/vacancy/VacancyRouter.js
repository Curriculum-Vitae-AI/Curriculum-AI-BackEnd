import { findVacancyLinks } from '../../core/controllers/vacancy/VacancyController.js';

import express from 'express';

const vacancyRouter = express.Router();
vacancyRouter.post('/find', findVacancyLinks);

export default vacancyRouter;
