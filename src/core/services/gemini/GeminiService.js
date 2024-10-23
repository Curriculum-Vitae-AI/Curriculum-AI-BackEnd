import { motivationLetterConfig, motivationLetterHistory, vacancyConfig, vacancyHistory } from '../../../config/GeminiConfig.js';
import Logger from '../../utils/log/Logger.js';
import GeminiResponseValidator from '../../domain/validators/GeminiResponseValidator.js';

import { GoogleGenerativeAI } from '@google/generative-ai';

import dotenv from 'dotenv';
dotenv.config({ path: './src/config/app.env' });

export default class GeminiService {
    constructor() {
        this.model = new GoogleGenerativeAI(process.env.GEMINI_KEY)
            .getGenerativeModel({
                model: 'gemini-1.5-flash'
            });
    }
    async getMotivationLetterBody(request) {
        const methodName = 'getMotivationLetterBody';
        Logger.start(methodName);
        try {
            const chatSession = this.model.startChat({
                motivationLetterConfig,
                history: motivationLetterHistory
            });
            Logger.info(methodName, 'Requisitando o Gemini para gerar o corpo da carta de motivação...');
            const geminiResponse = (await chatSession.sendMessage(request)).response.text().replace('```json', '').replace('```', '');
            const parsedResponse = JSON.parse(geminiResponse);
            GeminiResponseValidator.validateGeminiResponse(parsedResponse);
            Logger.info(methodName, 'Corpo da carta de motivação gerado com sucesso!');
            return parsedResponse;
        } catch (exception) {
            Logger.error(methodName, exception);
            throw exception;
        } finally {
            Logger.finish(methodName);
        }
    }
    async getVacancyLinks(request) {
        const methodName = 'getVacancyLinks';
        Logger.start(methodName);
        try {
            const chatSession = this.model.startChat({
                vacancyConfig,
                history: vacancyHistory
            });
            Logger.info(methodName, 'Requisitando o Gemini para encontrar links de vagas...');
            const geminiResponse = (await chatSession.sendMessage(request)).response.text().replace('```json', '').replace('```', '');
            const parsedResponse = JSON.parse(geminiResponse);
            GeminiResponseValidator.validateGeminiResponse(parsedResponse);
            Logger.info(methodName, 'Vagas encontradas com sucesso!');
            return parsedResponse;
        } catch (exception) {
            Logger.error(methodName, exception);
            throw exception;
        } finally {
            Logger.finish(methodName);
        }
    }
}
