import * as fs from 'fs';
import { extendZodWithOpenApi, OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
extendZodWithOpenApi(z);

import {
  MetaSchema,
  ThemeSchema,
  ClipSchema,
} from "./schema";

const ProjectResponse = z
  .object({
      id: z.string(),
      title: z.string(),
      ratio: z.string(),
      share: z.boolean(),
      teamId: z.string(),
      userId: z.string(),
      meta: MetaSchema,
      theme: ThemeSchema,
      clips: z.array(ClipSchema),
      createdAt: z.string(),
      updatedAt: z.string(),
  })
  .openapi('ProjectResponse');

const ExportRequest = z.object({
  id: z.string(),
  fps: z.enum(['30', '60']).default("30").openapi({ example: '30' }),
  resolution: z.enum(['720p', '1080p', '4k']).default('720p').openapi({ example: '720p' }),
  quality: z.enum(['low', 'medium', 'high']).openapi({ example: 'medium' }),
  isPublic: z.boolean().default(false).openapi({ example: false, description: 'video visibility' })
}).openapi('ExportOptions')

const ExportResponse = z.object({
  id: z.string(),
}).openapi('ExportResponse')

const ExportStatusResponse = z.object({
  id: z.string(),
  status: z.string(),
  url: z.string().nullish(),
}).openapi('ExportResponse')

const registry = new OpenAPIRegistry();

registry.registerPath({
  method: 'get',
  path: '/projects/{id}',
  summary: 'Get Project',
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: 'Project Response',
      content: {
        'application/json': {
          schema: ProjectResponse,
        },
      },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/projects',
  summary: 'Get Projects',
  request: {
    params: z.object({ 
      page: z.number().openapi({ example: 0 }),
      limit: z.number().openapi({ example: 20 })
    }),
  },
  responses: {
    200: {
      description: 'Project List Response',
      content: {
        'application/json': {
          schema: z.object({
            projects: z.array(ProjectResponse),
            pagination: z.object({
              page: z.number(),
              limit: z.number(),
              total: z.number(),
            })
          }),
        },
      },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/projects/{id}',
  summary: 'Create Project',
  request: {
    params: z.object({ 
      id: z.string(),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.string().openapi("Project json")
        },
      },
      required: true,
    }
  },
  responses: {
    200: {
      description: 'Project Response',
      content: {
        'application/json': {
          schema: ProjectResponse
        },
      },
    },
  },
});

registry.registerPath({
  method: 'put',
  path: '/projects/{id}',
  summary: 'Update Project',
  request: {
    params: z.object({ 
      id: z.string(),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.string().openapi("Project json")
        },
      },
      required: true,
    }
  },
  responses: {
    200: {
      description: 'project response',
      content: {
        'application/json': {
          schema: ProjectResponse
        },
      },
    },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/projects/{id}',
  summary: 'Delete Project',
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: 'Delete Operation Response',
      content: {
        'application/json': {
          schema: z.object({
            success: z.literal("true")
          })
        },
      },
    },
  },
});


registry.registerPath({
  method: 'post',
  path: '/exports',
  summary: 'Export Video',
  request: {
    body: {
      content: {
        'application/json': {
          schema: ExportRequest,
        },
      },
      required: true,
    }
  },
  responses: {
    200: {
      description: 'Export Response',
      content: {
        'application/json': {
          schema: ExportResponse
        },
      },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/exports/{id}',
  summary: 'Export Status',
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    200: {
      description: 'Export Response',
      content: {
        'application/json': {
          schema: ExportStatusResponse
        },
      },
    },
  },
});

// Register definitions here
const generator = new OpenApiGeneratorV3(registry.definitions);

const content = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'BlendDuck REST API',
    description: 'BlendDuck REST API for dynamic video creation',
  },
  servers: [{ url: 'https://blendduck.com/api/v1' }],
  // servers: [{ url: 'http://127.0.0.1:4000/api/v1' }],
});

function writeDocumentation() {
  const fileContent = JSON.stringify(content, null, 2)
  fs.writeFileSync(`${__dirname}/openapi.json`, fileContent, {
    encoding: 'utf-8',
  });
}

writeDocumentation();
