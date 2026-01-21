import path from 'node:path';
import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API-Pokedex',
      version: '1.0.0',
      description: 'Documentação da API gerada automaticamente com Swagger',
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Servidor de Desenvolvimento',
      },
    ],
  },

  apis: ['./src/**/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;