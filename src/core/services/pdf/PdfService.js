import { jsPDF } from 'jspdf';
import { logo } from '../../../assets/images.js';

import Logger from '../../utils/log/Logger.js';

const { TextField } = jsPDF.AcroForm;

export default class PdfService {
    generateMotivationLetterPdf() {
        const methodName = 'generateMotivationLetterPdf';
        try {
            Logger.start(methodName);
            const text = 'Gostaria de expressar meu interesse pela posição de Desenvolvedor NodeJS Júnior na Curriculum AI. Tenho dois anos de experiência como desenvolvedor back-end, trabalhando com Java e Spring Boot, o que me proporcionou uma base sólida no desenvolvimento de sistemas escaláveis e robustos. Além disso, adquiri conhecimento em cloud computing utilizando AWS e Azure, bem como experiência em sistemas de mensageria via Kafka, o que me permitiu lidar com comunicação assíncrona e processamento de grandes volumes de dados. Estou empolgado com a possibilidade de expandir minhas habilidades para a stack NodeJS e acredito que essa oportunidade seria ideal para minha transição e crescimento profissional. Tenho um grande interesse na inovação e no impacto que a Curriculum AI está gerando e estou ansioso para contribuir com minha experiência e me desenvolver como parte da equipe.';

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
