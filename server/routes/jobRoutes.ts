import express from "express";
import { getJobs, getJobById, createJob, deleteJob, getMyJobs } from "../controllers/jobController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// ─── Public Routes ────────────────────────────────────────────────────────────

router.get(
    "/",
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        /*
            #swagger.tags = ['Jobs']
            #swagger.summary = 'Get all jobs'
            #swagger.description = 'Returns all job postings. Supports filtering by category, location, search keyword, and featured flag. Results are sorted by newest first.'
            #swagger.security = []
            #swagger.parameters['category'] = {
                in: 'query',
                description: 'Filter by job category',
                required: false,
                schema: { type: 'string', example: 'Engineering' }
            }
            #swagger.parameters['location'] = {
                in: 'query',
                description: 'Filter by location (case-insensitive partial match)',
                required: false,
                schema: { type: 'string', example: 'New York' }
            }
            #swagger.parameters['search'] = {
                in: 'query',
                description: 'Search jobs by title (case-insensitive)',
                required: false,
                schema: { type: 'string', example: 'Backend Developer' }
            }
            #swagger.parameters['featured'] = {
                in: 'query',
                description: 'Filter to show only featured jobs',
                required: false,
                schema: { type: 'boolean', example: true }
            }
            #swagger.responses[200] = {
                description: 'List of jobs returned successfully',
                content: {
                    "application/json": {
                        schema: {
                            type: 'array',
                            items: { $ref: '#/definitions/JobPopulated' }
                        }
                    }
                }
            }
            #swagger.responses[500] = {
                description: 'Internal server error',
                content: {
                    "application/json": {
                        schema: { $ref: '#/definitions/ErrorResponse' }
                    }
                }
            }
        */
        next();
    },
    getJobs
);

router.get(
    "/:id",
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        /*
            #swagger.tags = ['Jobs']
            #swagger.summary = 'Get a job by ID'
            #swagger.description = 'Returns a single job with full company details and poster info.'
            #swagger.security = []
            #swagger.parameters['id'] = {
                in: 'path',
                required: true,
                description: 'MongoDB ObjectId of the job',
                schema: { type: 'string', example: '64abc123ef4567890abcdef1' }
            }
            #swagger.responses[200] = {
                description: 'Job found and returned',
                content: {
                    "application/json": {
                        schema: { $ref: '#/definitions/JobPopulatedFull' }
                    }
                }
            }
            #swagger.responses[404] = {
                description: 'Job not found',
                content: {
                    "application/json": {
                        schema: { $ref: '#/definitions/ErrorResponse' }
                    }
                }
            }
            #swagger.responses[500] = {
                description: 'Internal server error',
                content: {
                    "application/json": {
                        schema: { $ref: '#/definitions/ErrorResponse' }
                    }
                }
            }
        */
        next();
    },
    getJobById
);

// ─── Organization-Only Routes ──────────────────────────────────────────────────

router.post(
    "/",
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        /*
            #swagger.tags = ['Jobs']
            #swagger.summary = 'Create a new job posting'
            #swagger.description = 'Creates a job under the authenticated employers company. The employer must have completed company setup first. Company and postedBy are auto-attached from the authenticated user — do not send them in the body.'
            #swagger.security = [{ "bearerAuth": [] }]
            #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: '#/definitions/CreateJobBody' }
                    }
                }
            }
            #swagger.responses[201] = {
                description: 'Job created successfully',
                content: {
                    "application/json": {
                        schema: { $ref: '#/definitions/JobPopulated' }
                    }
                }
            }
            #swagger.responses[400] = {
                description: 'Company not set up yet — or Zod validation failed',
                content: {
                    "application/json": {
                        schema: {
                            oneOf: [
                                {
                                    type: 'object',
                                    properties: {
                                        error: { type: 'string', example: 'Please complete your company setup first.' }
                                    }
                                },
                                {
                                    type: 'object',
                                    properties: {
                                        error: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    path:    { type: 'array', items: { type: 'string' }, example: ['title'] },
                                                    message: { type: 'string', example: 'Title is required' }
                                                }
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
            #swagger.responses[401] = {
                description: 'Unauthorized — JWT token missing or invalid',
                content: {
                    "application/json": {
                        schema: { $ref: '#/definitions/ErrorResponse' }
                    }
                }
            }
            #swagger.responses[403] = {
                description: 'Forbidden — employer role required',
                content: {
                    "application/json": {
                        schema: { $ref: '#/definitions/ErrorResponse' }
                    }
                }
            }
            #swagger.responses[500] = {
                description: 'Internal server error',
                content: {
                    "application/json": {
                        schema: { $ref: '#/definitions/ErrorResponse' }
                    }
                }
            }
        */
        next();
    },
    authenticate,
    authorize(["organization"]),
    createJob as any
);

router.get(
    "/my/posted",
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        /*
            #swagger.tags = ['Jobs']
            #swagger.summary = 'Get my posted jobs'
            #swagger.description = 'Returns all jobs posted by the currently authenticated employer, sorted by newest first.'
            #swagger.security = [{ "bearerAuth": [] }]
            #swagger.responses[200] = {
                description: "Employers own job postings",
                content: {
                    "application/json": {
                        schema: {
                            type: 'array',
                            items: { $ref: '#/definitions/JobPopulated' }
                        }
                    }
                }
            }
            #swagger.responses[401] = {
                description: 'Unauthorized',
                content: {
                    "application/json": {
                        schema: { $ref: '#/definitions/ErrorResponse' }
                    }
                }
            }
            #swagger.responses[403] = {
                description: 'Forbidden — employer role required',
                content: {
                    "application/json": {
                        schema: { $ref: '#/definitions/ErrorResponse' }
                    }
                }
            }
            #swagger.responses[500] = {
                description: 'Internal server error',
                content: {
                    "application/json": {
                        schema: { $ref: '#/definitions/ErrorResponse' }
                    }
                }
            }
        */
        next();
    },
    authenticate,
    authorize(["organization"]),
    getMyJobs as any
);

router.delete(
    "/:id",
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        /*
            #swagger.tags = ['Jobs']
            #swagger.summary = 'Delete a job posting'
            #swagger.description = 'Permanently deletes a job. Only the employer who originally posted the job can delete it.'
            #swagger.security = [{ "bearerAuth": [] }]
            #swagger.parameters['id'] = {
                in: 'path',
                required: true,
                description: 'MongoDB ObjectId of the job to delete',
                schema: { type: 'string', example: '64abc123ef4567890abcdef1' }
            }
            #swagger.responses[200] = {
                description: 'Job deleted successfully',
                content: {
                    "application/json": {
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string', example: 'Job deleted successfully' }
                            }
                        }
                    }
                }
            }
            #swagger.responses[401] = {
                description: 'Unauthorized',
                content: {
                    "application/json": {
                        schema: { $ref: '#/definitions/ErrorResponse' }
                    }
                }
            }
            #swagger.responses[403] = {
                description: 'Forbidden — you can only delete your own job postings',
                content: {
                    "application/json": {
                        schema: { $ref: '#/definitions/ErrorResponse' }
                    }
                }
            }
            #swagger.responses[404] = {
                description: 'Job not found',
                content: {
                    "application/json": {
                        schema: { $ref: '#/definitions/ErrorResponse' }
                    }
                }
            }
            #swagger.responses[500] = {
                description: 'Internal server error',
                content: {
                    "application/json": {
                        schema: { $ref: '#/definitions/ErrorResponse' }
                    }
                }
            }
        */
        next();
    },
    authenticate,
    authorize(["organization"]),
    deleteJob as any
);

export default router;