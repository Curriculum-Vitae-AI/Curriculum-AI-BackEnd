import { jsPDF } from 'jspdf';
import { logo } from '../../../assets/images.js';

import Logger from '../../utils/log/Logger.js';

const { TextField } = jsPDF.AcroForm;

export default class PdfService {
    generateMotivationLetterPdf(geminiResponse) {
        const methodName = 'generateMotivationLetterPdf';
        try {
            Logger.start(methodName);
            const text = geminiResponse.response.replace(/\n/g, '');
            const pdf = new jsPDF();
            this.#insertMotivationLetterHeader(pdf);
            const line = this.#insertText(55, text, 180, pdf);
            this.#insertMotivationLetterFooter(pdf, line);
            const response = Buffer.from(pdf.output('arraybuffer'));
            return response;
        } catch (exception) {
            Logger.error(methodName, exception)
            throw exception;
        } finally {
            Logger.finish(methodName);
        }
    }

    #insertMotivationLetterHeader(pdf) {
        pdf.addImage(logo, 'PNG', 190, 2, 18, 22);
        pdf.setFont('Helvetica', 'bold');
        pdf.setFontSize(20);
        pdf.text('Carta de Motivação', 75, 35);
    }

    #insertText(startLine, text, maxWidth, pdf) {
        pdf.setFont('Helvetica', 'normal');
        pdf.setFontSize(16);
        const lines = pdf.splitTextToSize(text, maxWidth);
        for (const line of lines) {
            pdf.text(line, 15, startLine);
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
}
