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

        // ── What createJob accepts (matches your jobSchema Zod validator) ──
        CreateJobBody: {
            type: 'object',
            required: ['title', 'location', 'category', 'description'],
            properties: {
                title:       { type: 'string',  example: 'Senior Backend Developer' },
                location:    { type: 'string',  example: 'New York, NY' },
                category:    { type: 'string',  example: 'Engineering' },
                description: { type: 'string',  example: 'We are looking for an experienced Node.js developer...' },
                featured:    { type: 'boolean', example: false },
            },
        },

        // ── Populated company (getJobs / createJob / getMyJobs) ──
        CompanyBasic: {
            type: 'object',
            properties: {
                _id:             { type: 'string', example: '64abc123ef4567890abcdef2' },
                companyName:     { type: 'string', example: 'Acme Corp' },
                logo:            { type: 'string', example: 'https://cdn.example.com/logo.png' },
                companyIndustry: { type: 'string', example: 'Technology' },
            },
        },

        // ── Populated company (getJobById — includes extra fields) ──
        CompanyFull: {
            type: 'object',
            properties: {
                _id:                { type: 'string', example: '64abc123ef4567890abcdef2' },
                companyName:        { type: 'string', example: 'Acme Corp' },
                logo:               { type: 'string', example: 'https://cdn.example.com/logo.png' },
                location:           { type: 'string', example: 'San Francisco, CA' },
                companyIndustry:    { type: 'string', example: 'Technology' },
                companyLink:        { type: 'string', example: 'https://acme.com' },
                companyDescription: { type: 'string', example: 'Acme Corp builds innovative software solutions.' },
            },
        },

        // ── Populated poster ──
        PosterBasic: {
            type: 'object',
            properties: {
                _id:      { type: 'string', example: '64abc123ef4567890abcdef3' },
                fullname: { type: 'string', example: 'John Smith' },
                email:    { type: 'string', example: 'john@acme.com' },
            },
        },

        // ── Job with basic company populate (list views) ──
        JobPopulated: {
            type: 'object',
            properties: {
                _id:         { type: 'string',  example: '64abc123ef4567890abcdef1' },
                title:       { type: 'string',  example: 'Senior Backend Developer' },
                location:    { type: 'string',  example: 'New York, NY' },
                category:    { type: 'string',  example: 'Engineering' },
                description: { type: 'string',  example: 'We are looking for an experienced Node.js developer...' },
                featured:    { type: 'boolean', example: false },
                company:     { $ref: '#/definitions/CompanyBasic' },
                postedBy:    { $ref: '#/definitions/PosterBasic' },
                createdAt:   { type: 'string', format: 'date-time', example: '2024-01-15T10:30:00.000Z' },
                updatedAt:   { type: 'string', format: 'date-time', example: '2024-01-15T10:30:00.000Z' },
            },
        },

        // ── Job with full company populate (detail view) ──
        JobPopulatedFull: {
            type: 'object',
            properties: {
                _id:         { type: 'string',  example: '64abc123ef4567890abcdef1' },
                title:       { type: 'string',  example: 'Senior Backend Developer' },
                location:    { type: 'string',  example: 'New York, NY' },
                category:    { type: 'string',  example: 'Engineering' },
                description: { type: 'string',  example: 'We are looking for an experienced Node.js developer...' },
                featured:    { type: 'boolean', example: false },
                company:     { $ref: '#/definitions/CompanyFull' },
                postedBy:    { $ref: '#/definitions/PosterBasic' },
                createdAt:   { type: 'string', format: 'date-time', example: '2024-01-15T10:30:00.000Z' },
                updatedAt:   { type: 'string', format: 'date-time', example: '2024-01-15T10:30:00.000Z' },
            },
        },

        // ── Reusable error shape ──
        ErrorResponse: {
            type: 'object',
            properties: {
                error: { type: 'string', example: 'Resource not found' },
            },
        },
    },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.ts',];
swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);