import swaggerJSDoc from 'swagger-jsdoc';
import constants from '../constants/constant.js';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'PrimeTrade Task API',
    version: '1.0.0',
    description: 'Task management REST API with JWT authentication and RBAC.'
  },
  servers: [
    {
      url: constants.config.swaggerServerUrl
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};

const options = {
  definition: swaggerDefinition,
  apis: ['./src/routes/*.js', './src/models/*.js']
};

export const swaggerSpec = swaggerJSDoc(options);
