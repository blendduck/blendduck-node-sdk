import { BlendDuck } from './';

export interface ExportOptions {
  resolution?: string,
  quality?: string,
  fps?: number
}

export enum ExportStatus {
  Processing = "processing",
  Completed = "success",
  Error = "error",
}

export interface ExportVideo {
  id: string;
  status: ExportStatus;
  projectId: string;
  url?: string;
  isPublic: boolean;
  teamId: string;
  userId: string;
  createdAt: string;
}

export class VideosAPI {
  constructor(private client: BlendDuck) {}

  async get(id: string): Promise<ExportVideo> {
    const json = await this.client.request<ExportVideo>(`/exports/${id}`);
    return json
  }

  async export(id: string, options?: ExportOptions): Promise<string> {
    const json = await this.client.request<{ id: string }>('/exports', {
      method: 'POST',
      body: JSON.stringify({
        id,
        ...(options ?? {}),
      }),
    });
    return json.id;
  }
}
