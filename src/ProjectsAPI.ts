import { Project, BlendDuck } from './';

type ProjectListQuery = {
  userId?: string,
  page?: number,
  pageSize?: number,
}

type ProjectListResponse = {
  projects: Project[],
  pagination: {
    page: number,
    pageSize: number,
    total: number,
  }
}

export class ProjectsAPI {
  constructor(private client: BlendDuck) {}

  async list(query?: ProjectListQuery): Promise<ProjectListResponse> {
    let formatedQuery: Record<string, string> | undefined = undefined;
    if (query) {
      formatedQuery = {}
      Object.keys(query).forEach((key) => {
        formatedQuery![key] = String(query[key as keyof ProjectListQuery]) 
      })
    }
    const json = await this.client.request<ProjectListResponse>('/projects', {
      query: formatedQuery,
    });
    return {
      pagination: json.pagination,
      projects: json.projects.map((json: any) => {
        return Project.fromJSON(json);
      })
    }
  }

  async get(id: string): Promise<Project> {
    const json = await this.client.request<Project>(`/projects/${id}`);
    return Project.fromJSON(json)
  }

  async create(project: Project): Promise<string> {
    const json = await this.client.request<{ id: string }>('/projects', {
      method: 'POST',
      body: JSON.stringify(project.toJSON()),
    });
    return json.id;
  }

  async update(project: Project): Promise<boolean> {
    const response = await this.client.request(`/projects/${project.id}`, {
      method: 'PUT',
      body: JSON.stringify(project.toJSON()),
    });
    return true
  }

  async delete(projectId: string): Promise<boolean> {
    const response = await this.client.request(`/projects/${projectId}`, {
      method: 'DELETE',
    });
    return true;
  }
}
