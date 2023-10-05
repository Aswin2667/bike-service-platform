const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bike Service Center API Documentaion',
      version: '1.0.0',
      description: 'Welcome to the API documentation for the Bike Service Application. This API allows you to manage customer data, bike information, service records. You can perform actions such as user registration, user login, and creating/managing service records.',
    },
    servers: [
      {
        url: process.env.SWAGGER_DOCS_BASE_URL,
      },
    ],
  },
  apis: ['./routes/*.js','./models/*.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
