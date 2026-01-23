import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Pokedéx UNIFOR',
      version: '1.0.0',
    },
    servers: [{ url: `http://localhost:8080` }],
  },
  apis: ['./src/shared/docs/**/*.yaml'],
}

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;