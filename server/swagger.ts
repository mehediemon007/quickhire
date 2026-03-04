import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: { title: 'My API', description: 'Auto-generated API Docs' },
    host: 'localhost:5000',
    schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.ts', './routes/*.ts'];
swaggerAutogen()(outputFile, endpointsFiles, doc);