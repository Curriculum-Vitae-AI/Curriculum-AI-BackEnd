import { jsPDF } from 'jspdf';
import { logoMotivationLetter, logoRoadMap } from '../../../assets/images.js';

import Logger from '../../utils/log/Logger.js';

const { TextField } = jsPDF.AcroForm;

const HELVETICA = 'Helvetica';
const BOLD = 'bold';
const NORMAL = 'normal';

export default class PdfService {

    generateMotivationLetterPdf(geminiResponse) {
        const methodName = 'generateMotivationLetterPdf';
        try {
            Logger.start(methodName);
            const text = geminiResponse.response.replace(/\n/g, '');
            const pdf = new jsPDF();
            this.#insertMotivationLetterHeader(pdf);
            pdf.setFont(HELVETICA, NORMAL);
            pdf.setFontSize(16);
            const line = this.#insertText(55, text, 180, 15, pdf);
            this.#insertMotivationLetterFooter(pdf, line);
            return Buffer.from(pdf.output('arraybuffer'));
        } catch (exception) {
            Logger.error(methodName, exception);
            throw exception;
        } finally {
            Logger.finish(methodName);
        }
    }

    #insertMotivationLetterHeader(pdf) {
        pdf.addImage(logoMotivationLetter, 'PNG', 190, 2, 18, 22);
        pdf.setFont(HELVETICA, BOLD);
        pdf.setFontSize(20);
        const text = 'Carta de Motivação';
        pdf.text(text, this.#getCenterWidth(pdf, text), 35);
    }

    #getCenterWidth(pdf, text) {
        const pageWidth = pdf.internal.pageSize.getWidth();
        const textWidth = pdf.getTextWidth(text);
        return (pageWidth - textWidth) / 2;
    }

    #insertText(startLine, text, maxWidth, startWidth, pdf) {
        const lines = pdf.splitTextToSize(text, maxWidth);
        for (const line of lines) {
            pdf.text(line, startWidth, startLine);
            startLine += 7;
        }
        return startLine;
    }

    #insertMotivationLetterFooter(pdf, line) {
        pdf.text('Atenciosamente,', 15, line + 10);
        const textField = new TextField();
        textField.Rect = [15, line + 15, 180, 10];
        textField.fontSize = 8;
        pdf.addField(textField);
    }

    generateRoadMapPdf(geminiResponse) {
        const methodName = 'generateRoadMapPdf';
        try {
            Logger.start(methodName);
            const pdf = new jsPDF();
            this.#insertRoadMapHeader(pdf, geminiResponse);
            this.#insertRoadMapBody(pdf, geminiResponse);
            return Buffer.from(pdf.output('arraybuffer'));
        } catch (exception) {
            Logger.error(methodName);
            throw exception;
        } finally {
            Logger.finish(methodName);
        }
    }

    #insertRoadMapHeader(pdf, geminiResponse) {
        pdf.addImage(logoRoadMap, 'PNG', 65, 2, 80, 25);
        pdf.setFont(HELVETICA, BOLD);
        pdf.setFontSize(18);
        pdf.setTextColor(0, 93, 170);
        const text = geminiResponse.response.roadmapName;
        pdf.text(text, this.#getCenterWidth(pdf, text), 35);
    }

    #insertRoadMapBody(pdf, geminiResponse) {
        const response = geminiResponse.response;
        const values = {
            'INICIANTE': response.begginner,
            'INTERMEDIÁRIO': response.intermediate,
            'AVANÇADO': response.advanced
        };

        pdf.setTextColor(255, 255, 255);
        let startLine = 55;

        Object.entries(values).forEach(([key, value]) => {
            const textBlocks = [];

            const updatedLine = this.#insertLevelHeader(startLine, key, textBlocks);
            this.#insertTopics(pdf, updatedLine, value.topics, textBlocks);

            const rectHeight = key === 'INICIANTE' ? 250 : 280;
            pdf.setFillColor(0, 93, 170);
            pdf.roundedRect(5, startLine - 10, 200, rectHeight, 10, 10, 'F');

            for (const text of textBlocks) {
                pdf.setFont(text.font, text.fontType);
                pdf.setFontSize(text.fontSize);
                pdf.text(text.value, 10, text.position);
            }

            if (key !== 'AVANÇADO') {
                pdf.addPage();
                startLine = 20;
            }
        });
    }

    #insertLevelHeader(line, level, textBlocks) {
        textBlocks.push({
            font: HELVETICA,
            fontType: BOLD,
            fontSize: 16,
            value: level,
            position: line
        });
        return line + 10;
    }

    #insertTopics(pdf, line, topics, textBlocks) {
        for (const topic of topics) {
            textBlocks.push({
                font: HELVETICA,
                fontType: BOLD,
                fontSize: 15,
                value: topic.topicName,
                position: line
            });
            line = this.#insertMatters(pdf, line, topic.matters, textBlocks);
            line += 5;
        }
        return line;
    }

    #insertMatters(pdf, line, matters, textBlocks) {
        line += 8;
        for (const matter of matters) {
            textBlocks.push({
                font: HELVETICA,
                fontType: BOLD,
                fontSize: 14,
                value: matter.matterName,
                position: line
            });
            line += 8;
            pdf.setFontSize(14);
            const lines = pdf.splitTextToSize(matter.matterDescription, 190);
            for (const splittedLine of lines) {
                textBlocks.push({
                    font: HELVETICA,
                    fontType: NORMAL,
                    fontSize: 14,
                    value: splittedLine,
                    position: line
                });
                line += 7;
            }
            line += 2;
        }
        return line;
    }
}
