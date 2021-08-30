const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      version: '1.0.0',      
      title: 'OHSOOL; 오늘의 술',        // by default: 'REST API'
      description: '당신을 위한 오늘의 맥주.',  // by default: ''
    },
    host: 'https://ohsool.shop/',      
    basePath: '/', 
    schemes: ['http','https'],  
    consumes: ['application/json'],  
    produces: ['application/json'], 
    tags: [        
      {
        name: 'USER',         // Tag name
        description: '',  // Tag description
      },
      {
        name: 'BEER',         // Tag name
        description: '',  // Tag description
      },
      {
        name: 'MY BEER',         // Tag name
        description: '',  // Tag description
      },
      {
        name: 'BEER CATEGORY',         // Tag name
        description: '',  // Tag description
      },
      {
        name: 'SEARCH',         // Tag name
        description: '',  // Tag description
      },
    ],
    securityDefinitions: {
        Bearer: {
            type: "apiKey",
            name: "Authorization",
            in:"header",
            description: "Bearer <Token> 을 입력해주세요."
        },
        secretKey: {
            type: "secretKey",
            name: "secretKey",
            in:"header",
            description: "secretKey"
        },
    },  // by default: empty object
    definitions: {
    },          // by default: empty object
  };

const outputFile = './swagger/swagger-output.json';
const endpointsFiles = [
                        './src/routers/*.ts', 
                       ];

swaggerAutogen(outputFile, endpointsFiles, doc);