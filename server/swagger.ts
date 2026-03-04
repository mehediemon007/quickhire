import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: { title: 'My API', description: 'Auto-generated API Docs' },
    host: 'localhost:5000',
    schemes: ['http', 'https'],
    basePath: '/api'
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.ts', './routes/jobRoutes.ts', './routes/applicationRoutes.ts', './routes/authRoutes.ts'];
swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);