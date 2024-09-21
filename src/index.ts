import { ProjectsAPI } from './ProjectsAPI';
import { VideosAPI } from './VideosAPI';
export {
  ElementType,
  AnimationType,
  ProjectRatio,
  ProjectMeta,
  ProjectTheme,
  ClipTransition,
  ColorStyle,
  BackgroundStyle,
} from './types';
export { Project } from './Project';
export { Clip } from './Clip';
export { Element } from './Element';
export { Animation } from './Animation';
export { AudioPlay } from './AudioPlay';
export {
  ExportOptions,
  ExportStatus,
} from "./VideosAPI";
export { nanoid } from './utils';
export * from "./elements";
export * from "./validator";

export interface BlendDuckConfig {
  apiKey?: string;
  baseUrl?: string;
  fetch?: typeof fetch;
}

export class APIError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

type FetchOptions = RequestInit & {
  query?: Record<string, string>;
};

export class BlendDuck {
  apiKey: string;
  baseUrl: string;
  projects: ProjectsAPI;
  videos: VideosAPI;
  fetchFn: typeof fetch;

  constructor(options?: BlendDuckConfig) {
    const apiKey = options?.apiKey ?? process.env.BLENDDUCK_API_KEY;
    if (!apiKey) {
      throw new Error('The apiKey is required');
    }
    this.apiKey = apiKey;
    this.baseUrl = options?.baseUrl ?? 'https://blendduck.com/api/v1';
    this.fetchFn = options?.fetch ?? fetch;
    this.projects = new ProjectsAPI(this);
    this.videos = new VideosAPI(this);
  }

  async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { query, ...fetchOptions } = options ?? {};
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (query) {
      Object.entries(query).forEach(([key, value]) => url.searchParams.append(key, value));
    }

    try {
      const response = await this.fetchFn(url.toString(), {
        ...fetchOptions,
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
      });

      const json = await response.json();
      if (response.ok) {
        return json as T
      } else {
        throw new APIError((json as { error: string }).error);
      }
    } catch (err) {
      throw new APIError(err?.toString() ?? 'Unkown error');
    }
  }
}

export default BlendDuck;
