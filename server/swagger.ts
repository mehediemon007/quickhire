import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: { title: 'My API', description: 'Auto-generated API Docs' },
    host: 'localhost:5000',
    schemes: ['http'],
    basePath: '/',

    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
        }
    },

    definitions: {

        CreateJobBody: {
            title: 'string',
            location: 'string',
            category: 'string',
            description: 'string',
            featured: 'boolean',
        },

        CompanyBasic: {
            _id: 'string',
            companyName: 'string',
            logo: 'string',
            companyIndustry: 'string',
        },

        CompanyFull: {
            _id: 'string',
            companyName: 'string',
            logo: 'string',
            location: 'string',
            companyIndustry: 'string',
            companyLink: 'string',
            companyDescription: 'string',
        },

        PosterBasic: {
            _id: 'string',
            fullname: 'string',
            email: 'string',
        },

        JobPopulated: {
            _id: 'string',
            title: 'string',
            location: 'string',
            category: 'string',
            description: 'string',
            featured: 'boolean',
            company: { $ref: '#/definitions/CompanyBasic' },
            postedBy: { $ref: '#/definitions/PosterBasic' },
            createdAt: 'string',
            updatedAt: 'string',
        },

        JobPopulatedFull: {
            _id: 'string',
            title: 'string',
            location: 'string',
            category: 'string',
            description: 'string',
            featured: 'boolean',
            company: { $ref: '#/definitions/CompanyFull' },
            postedBy: { $ref: '#/definitions/PosterBasic' },
            createdAt: 'string',
            updatedAt: 'string',
        },

        ErrorResponse: {
            error: 'string',
        },
    },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.ts'];
swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);