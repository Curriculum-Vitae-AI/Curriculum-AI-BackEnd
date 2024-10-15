import PdfService from '../../../../core/services/pdf/PdfService.js';
import Logger from '../../../../core/utils/log/Logger.js';

jest.mock('../../../../assets/images.js', () => ({
    logo: 'mocked-logo-data'
}));

jest.mock('jspdf', () => {
    const jsPDFMock = jest.fn().mockImplementation(() => ({
        addImage: jest.fn(),
        setFont: jest.fn(),
        setFontSize: jest.fn(),
        text: jest.fn(),
        splitTextToSize: jest.fn((text, maxWidth) => {
            return text.length > maxWidth ? text.split(' ') : [text];
        }),
        output: jest.fn(() => new ArrayBuffer(8)),
        addField: jest.fn(),
    }));

    jsPDFMock.AcroForm = {
        TextField: jest.fn().mockImplementation(() => ({
            Rect: [],
            fontSize: 8,
        })),
    };

    return { jsPDF: jsPDFMock };
});

jest.mock('../../../../core/utils/log/Logger.js', () => ({
    start: jest.fn(),
    finish: jest.fn(),
    error: jest.fn(),
}));

describe('PdfService', () => {
    const pdfService = new PdfService();

    it('should generate a PDF and call logger methods', () => {
        const response = pdfService.generateMotivationLetterPdf();

        expect(Logger.start).toHaveBeenCalledWith('generateMotivationLetterPdf');
        expect(Logger.finish).toHaveBeenCalledWith('generateMotivationLetterPdf');
        expect(response).toBeInstanceOf(Buffer);
    });

    it('should log error and rethrow exception when an error occurs', () => {
        const error = new Error('Test error');
        Logger.start.mockImplementation(() => {
            throw error;
        });
        expect(() => pdfService.generateMotivationLetterPdf()).toThrow(error);
        expect(Logger.error).toHaveBeenCalledTimes(1);
    });
});
