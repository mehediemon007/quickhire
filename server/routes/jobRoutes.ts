import express from "express";
import { getJobs, getJobById, createJob, deleteJob, getMyJobs } from "../controllers/jobController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// ─── Public Routes ────────────────────────────────────────────────────────────

router.get("/", getJobs);
/*
    #swagger.tags = ['Jobs']
    #swagger.summary = 'Get all jobs'
    #swagger.description = 'Returns all job postings. Supports filtering by category, location, search keyword, and featured flag.'
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
        description: 'List of jobs returned successfully, sorted by newest first',
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

router.get("/:id", getJobById);
/*
    #swagger.tags = ['Jobs']
    #swagger.summary = 'Get a job by ID'
    #swagger.description = 'Returns a single job with full company and poster details.'
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

// ─── Employer-Only Routes ─────────────────────────────────────────────────────

router.post("/", authenticate, authorize(["employer"]), createJob);
/*
    #swagger.tags = ['Jobs']
    #swagger.summary = 'Create a new job posting'
    #swagger.description = 'Creates a job under the authenticated employer company. The employer must have completed company setup first. Company is auto-attached from the authenticated user.'
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
        description: 'Job created successfully. Returns the job with populated company info.',
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

router.get("/my/posted", authenticate, authorize(["employer"]), getMyJobs);
/*
    #swagger.tags = ['Jobs']
    #swagger.summary = "Get my posted jobs"
    #swagger.description = 'Returns all jobs posted by the currently authenticated employer, sorted by newest first.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
        description: "Employer's own job postings",
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

router.delete("/:id", authenticate, authorize(["employer"]), deleteJob);
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

export default router;