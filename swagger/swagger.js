const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger/swagger-output.json';
const endpointsFiles = [
                        './src/routers/beer.ts', 
                        './src/routers/beerCategory.ts',
                        './src/routers/myBeer.ts',
                        './src/routers/user.ts'
                       ];

swaggerAutogen(outputFile, endpointsFiles);