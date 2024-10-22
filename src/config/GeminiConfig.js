export const motivationLetterConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 500,
    responseMimeType: "application/json",
    responseSchema: {
        type: "object",
        properties: {
            response: {
                type: "string"
            },
            code: {
                type: "number"
            },
            greetings: {
                type: "string"
            }
        },
        required: [
            "response",
            "code",
            "greetings"
        ]
    },
};
export const motivationLetterHistory = [
    {
        role: "user",
        parts: [
            { text: "considere os dados para montar o corpo de uma carta de motivação na string response:empresa=curriculum-ai;vaga=dev node js junior;experiencia=Tenho experiência de 2 anos como desenvolvedor Java;para a resposta considere:code: deve ser 200 para sucesso e 400 para caso a vaga não seja um trabalho de verdade (somente valide se existe sem comparar com a experiencia)response: nao deve ter quebras de linha nem campos a serem preenchidos posteriomentegreetings: neste coloque a finalização (ex: atenciosamente, nome)" },
        ],
    },
    {
        role: "model",
        parts: [
            { text: '{"code":"200","greetings":"Atenciosamente, [Seu nome]","response":"Prezado(a) [nome da empresa],Escrevo para manifestar meu grande interesse na vaga de Dev Node.js Junior. Acompanho o trabalho da [empresa] há algum tempo e admiro o que vocês construíram. Minha paixão por desenvolvimento e minhas habilidades em Javascript me impulsionam a buscar essa oportunidade.Tenho experiência de 2 anos como desenvolvedor Java, o que me proporcionou um sólido conhecimento em programação orientada a objetos e boas práticas de desenvolvimento. Acredito que minhas habilidades em Java, juntamente com minha vontade de aprender e me dedicar ao Node.js, me permitirão contribuir significativamente para a equipe.Estou ansioso para aprender mais sobre a vaga e como posso agregar valor à [empresa]. Agradeço a oportunidade de apresentar minha candidatura e espero ter a chance de conversar com vocês em breve.}"'},
        ],
    },
];