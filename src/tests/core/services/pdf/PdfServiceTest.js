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
        splitTextToSize: jest.fn((text, maxWidth) => text.length > maxWidth ? text.split(' ') : [text]),
        output: jest.fn(() => new ArrayBuffer(8)),
        addField: jest.fn(),
        internal: {
            pageSize: {
                getWidth: jest.fn(() => 595.28),
                getHeight: jest.fn(() => 841.89)
            }
        },
        getTextWidth: jest.fn(() => 2),
        addPage: jest.fn(),
        roundedRect: jest.fn(),
        setTextColor: jest.fn(),
        setFillColor: jest.fn()
    }));

    jsPDFMock.AcroForm = {
        TextField: jest.fn().mockImplementation(() => ({
            Rect: [],
            fontSize: 8
        }))
    };

    return { jsPDF: jsPDFMock };
});

jest.mock('../../../../core/utils/log/Logger.js', () => ({
    start: jest.fn(),
    finish: jest.fn(),
    error: jest.fn()
}));

describe('PdfService', () => {
    const pdfService = new PdfService();

    it('generateMotivationLetterPdf', () => {
        const response = pdfService.generateMotivationLetterPdf({ response: 'Test' });

        expect(Logger.start).toHaveBeenCalledWith('generateMotivationLetterPdf');
        expect(Logger.finish).toHaveBeenCalledWith('generateMotivationLetterPdf');
        expect(response).toBeInstanceOf(Buffer);
    });

    it('generateRoadMapPdf', () => {
        const response = pdfService.generateRoadMapPdf({ response: {
            roadmapName: 'Test',
            begginner: {
                topics: [{
                    topicName: 'test',
                    matters: [{
                        matterName: 'test',
                        matterDescription: 'test'
                    }]
                }]
            },
            intermediate: {
                topics: [{
                    topicName: 'test',
                    matters: [{
                        matterName: 'test',
                        matterDescription: 'test'
                    }]
                }]
            },
            advanced: {
                topics: [{
                    topicName: 'test',
                    matters: [{
                        matterName: 'test',
                        matterDescription: 'test'
                    }]
                }]
            }
        }});
        expect(Logger.start).toHaveBeenCalledWith('generateRoadMapPdf');
        expect(Logger.finish).toHaveBeenCalledWith('generateRoadMapPdf');
        expect(response).toBeInstanceOf(Buffer);
    });

    it('generateMotivationLetterPdf error', () => {
        const error = new Error('Test error');
        Logger.start.mockImplementation(() => {
            throw error;
        });
        expect(() => pdfService.generateMotivationLetterPdf()).toThrow(error);
        expect(Logger.error).toHaveBeenCalledTimes(1);
    });

    it('generateRoadMapPdf error', () => {
        const error = new Error('Test error');
        Logger.start.mockImplementation(() => {
            throw error;
        });
        expect(() => pdfService.generateRoadMapPdf('request')).toThrow(error);
        expect(Logger.error).toHaveBeenCalledTimes(1);
    });
});
