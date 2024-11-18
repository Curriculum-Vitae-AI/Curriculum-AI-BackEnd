export const motivationLetterConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 500,
    responseMimeType: 'application/json',
    responseSchema: {
        type: 'object',
        properties: {
            response: {
                type: 'string'
            },
            code: {
                type: 'number'
            },
            greetings: {
                type: 'string'
            }
        },
        required: [
            'response',
            'code',
            'greetings'
        ]
    }
};
export const motivationLetterHistory = [
    {
        role: 'user',
        parts: [
            { text: 'considere os dados para montar o corpo de uma carta de motivação na string response:empresa=curriculum-ai;vaga=dev node js junior;experiencia=Tenho experiência de 2 anos como desenvolvedor Java;para a resposta considere:code: deve ser 200 para sucesso e 400 para caso a vaga não seja um trabalho de verdade (somente valide se existe sem comparar com a experiencia)response: nao deve ter quebras de linha nem campos a serem preenchidos posteriomentegreetings: neste coloque a finalização (ex: atenciosamente, nome)' }
        ]
    },
    {
        role: 'model',
        parts: [
            { text: '{"code":"200","greetings":"Atenciosamente, [Seu nome]","response":"Prezado(a) Curriculum-ai,Escrevo para manifestar meu grande interesse na vaga de Dev Node.js Junior. Acompanho o trabalho da Curriculum-ai há algum tempo e admiro o que vocês construíram. Minha paixão por desenvolvimento e minhas habilidades em Javascript me impulsionam a buscar essa oportunidade.Tenho experiência de 2 anos como desenvolvedor Java, o que me proporcionou um sólido conhecimento em programação orientada a objetos e boas práticas de desenvolvimento. Acredito que minhas habilidades em Java, juntamente com minha vontade de aprender e me dedicar ao Node.js, me permitirão contribuir significativamente para a equipe.Estou ansioso para aprender mais sobre a vaga e como posso agregar valor à [empresa]. Agradeço a oportunidade de apresentar minha candidatura e espero ter a chance de conversar com vocês em breve.}"' }
        ]
    }
];

export const vacancyConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 500,
    responseMimeType: 'application/json',
    responseSchema: {
        type: 'object',
        properties: {
            response: {
                type: 'array',
                items: {
                    type: 'string'
                }
            },
            code: {
                type: 'number'
            }
        },
        required: [
            'response',
            'code'
        ]
    }
};

export const vacancyHistory = [
    {
        role: 'user',
        parts: [
            { text: 'encontre link de vagas com os seguintes atributos:n\ncargo: Programador Java\nlocalidade: São Paulo\n\nresposta:\ncode deve ser 200 para sucesso e 400 para caso os atributos não façam sentido' }
        ]
    },
    {
        role: 'model',
        parts: [
            { text: '{"code": "200", "response": ["https://www.linkedin.com/jobs/search/?&keywords=Programador+Java&location=São+Paulo", "https://indeed.com/empregos?q=Programador+Java&l=São+Paulo", "https://www.infojobs.com.br/empregos.aspx?palabra=programador+java", "https://www.catho.com.br/vagas/programador-java/sao-paulo-sp/", "https://www.vagas.com.br/vagas-de-programador-java?São+Paulo"]}' }
        ]
    }
];

export const roadMapConfig =
{
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 2000,
    responseMimeType: "application/json",
    responseSchema: {
        type: "object",
        properties: {
            code: {
                type: "number"
            },
            response: {
                type: "object",
                properties: {
                    beginner: {
                        type: "object",
                        properties: {
                            topics: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        matters: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    matterName: {
                                                        type: "string"
                                                    },
                                                    matterDescription: {
                                                        type: "string"
                                                    }
                                                },
                                                required: [
                                                    "matterName",
                                                    "matterDescription"
                                                ]
                                            }
                                        },
                                        topicName: {
                                            type: "string"
                                        }
                                    },
                                    required: [
                                        "matters",
                                        "topicName"
                                    ]
                                }
                            }
                        },
                        required: [
                            "topics"
                        ]
                    },
                    intermediate: {
                        type: "object",
                        properties: {
                            topics: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        matters: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    matterName: {
                                                        type: "string"
                                                    },
                                                    matterDescription: {
                                                        type: "string"
                                                    }
                                                },
                                                required: [
                                                    "matterName",
                                                    "matterDescription"
                                                ]
                                            }
                                        },
                                        topicName: {
                                            type: "string"
                                        }
                                    },
                                    required: [
                                        "matters",
                                        "topicName"
                                    ]
                                }
                            }
                        },
                        required: [
                            "topics"
                        ]
                    },
                    advanced: {
                        type: "object",
                        properties: {
                            topics: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        matters: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    matterName: {
                                                        type: "string"
                                                    },
                                                    matterDescription: {
                                                        type: "string"
                                                    }
                                                },
                                                required: [
                                                    "matterName",
                                                    "matterDescription"
                                                ]
                                            }
                                        },
                                        topicName: {
                                            type: "string"
                                        }
                                    },
                                    required: [
                                        "matters",
                                        "topicName"
                                    ]
                                }
                            }
                        },
                        required: [
                            "topics"
                        ]
                    },
                    roadmapName: {
                        type: "string"
                    }
                },
                required: [
                    "beginner",
                    "intermediate",
                    "advanced",
                    "roadmapName"
                ]
            }
        },
        required: [
            "code",
            "response"
        ]
    },
};

export const roadMapHistory = [
    {
        role: "user",
        parts: [
            { text: "monte um roadmap com o seguinte tema:\n\nroadmap para se tornar desenvolvedor Java\n\nresposta: \ncodigo 200 para sucesso e 400 para caso a requisição não faça sentido\nmaximo de 2 topicos e 4 materias por nivel\ntopicName deve ser um nome simples de no máximo 3 palavras para o roadmap , exemplo \"Estudos Java\".\nnão repita nome de tópicos e matérias" },
        ],
    },
    {
        role: "model",
        parts: [
            { text: '{"code": 200,"response": {"advanced": {"topics": [{"matters": [{"matterDescription": "Aprenda sobre Spring Boot, um framework popular para desenvolvimento web com Java.", "matterName": "Spring Boot"}, {"matterDescription": "Domine o uso de APIs RESTful para construir aplicações web.", "matterName": "APIs RESTful"}, {"matterDescription": "Explore frameworks de testes como JUnit e Mockito para garantir a qualidade do código.", "matterName": "Testes Unitários"}, {"matterDescription": "Aprenda sobre bancos de dados relacionais e como integrá-los com suas aplicações Java.", "matterName": "Banco de Dados"}], "topicName": "Desenvolvimento Web"}, {"matters": [{"matterDescription": "Explore ferramentas de build como Maven e Gradle para gerenciar dependências e construir projetos.", "matterName": "Gerenciamento de Dependências"}, {"matterDescription": "Aprenda sobre design patterns e princípios SOLID para escrever código limpo e manutenível.", "matterName": "Design Patterns"}, {"matterDescription": "Mergulhe em frameworks de persistência como Hibernate e JPA para trabalhar com bancos de dados.", "matterName": "Persistência de Dados"}, {"matterDescription": "Explore conceitos avançados como multithreading e programação assíncrona.", "matterName": "Programação Concorrente"}], "topicName": "Fundamentos Avançados"}]}, "begginner": {"topics": [{"matters": [{"matterDescription": "Aprenda os conceitos básicos da linguagem Java, como variáveis, tipos de dados, operadores e estruturas de controle.", "matterName": "Sintaxe Java"}, {"matterDescription": "Entenda a estrutura de classes e objetos, pilares da programação orientada a objetos em Java.", "matterName": "Programação Orientada a Objetos"}, {"matterDescription": "Aprenda a trabalhar com arrays, listas e outros tipos de coleções em Java.", "matterName": "Coleções"}, {"matterDescription": "Entenda o conceito de exceções e como lidar com erros em seus programas.", "matterName": "Exceções"}], "topicName": "Estudos Java"}, {"matters": [{"matterDescription": "Instale o JDK (Java Development Kit) e configure seu ambiente de desenvolvimento.", "matterName": "Instalação e Configuração"}, {"matterDescription": "Aprenda a usar uma IDE (Integrated Development Environment) como Eclipse ou IntelliJ IDEA para codificar em Java.", "matterName": "IDE para Java"}, {"matterDescription": "Entenda o ciclo de vida de um programa Java, desde a compilação até a execução.", "matterName": "Ciclo de Vida do Programa"}, {"matterDescription": "Pratique a escrita de código Java resolvendo exercícios e desafios.", "matterName": "Exercícios Práticos"}], "topicName": "Introdução à Programação"}]}, "intermediate": {"topics": [{"matters": [{"matterDescription": "Aprenda a usar interfaces e herança para implementar polimorfismo e reutilização de código.", "matterName": "Interfaces e Herança"}, {"matterDescription": "Domine a criação e manipulação de threads para realizar tarefas concorrentes.", "matterName": "Multithreading"}, {"matterDescription": "Entenda o funcionamento de Generics para escrever código mais flexível e seguro.", "matterName": "Generics"}, {"matterDescription": "Aprenda a usar Collections Framework para manipular e armazenar dados eficientemente.", "matterName": "Coleções Avançadas"}], "topicName": "Fundamentos Intermediários"}, {"matters": [{"matterDescription": "Aprenda sobre o framework Servlet para desenvolver aplicações web com Java.", "matterName": "Servlets"}, {"matterDescription": "Domine o uso de JSP (JavaServer Pages) para criar páginas web dinâmicas.", "matterName": "JSP"}, {"matterDescription": "Explore o framework JDBC (Java Database Connectivity) para interagir com bancos de dados.", "matterName": "JDBC"}, {"matterDescription": "Aprenda sobre os conceitos de segurança e como implementar medidas de segurança em suas aplicações.", "matterName": "Segurança"}], "topicName": "Desenvolvimento Web Básico"}]}, "roadmapName": "Roadmap para se tornar Desenvolvedor Java"}}' }
        ],
    },
];
