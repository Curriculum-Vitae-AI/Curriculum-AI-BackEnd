import { createMotivationLetter } from '../../core/controllers/motivation-letter/MotivationLetterController.js';

import express from 'express';

const motivationLetterRouter = express.Router();
motivationLetterRouter.post('/create', createMotivationLetter);

export default motivationLetterRouter;
