import { ProjectMeta, ProjectTheme, Clip, nanoid, ProjectRatio } from './index';


function createDefaultTheme(): ProjectTheme {
  return {
    background: {
      color: {
        type: 'color',
        color: '#000000ff',
      }
    },
    fontFamily: 'Inter',
    fontColor: {
      type: 'color',
      color: '#ffffffff',
    },
    backgroundAudio: undefined,
  }
}

export class Project {
  id: string;
  title: string;
  ratio: ProjectRatio;
  share: boolean = false;
  meta: ProjectMeta = { version: '1.0' };
  theme: ProjectTheme = createDefaultTheme()
  clips: Clip[] = [];
  teamId?: string;
  userId?: string;

  constructor(data?: any) {
    this.id = data?.id ?? undefined;
    this.title = data?.title ?? 'Untitled';
    this.ratio = data?.ratio ?? '9:16';
    this.share = data?.share ?? false;
    this.meta = data?.meta ?? { version: '1.0'};
    this.theme = data?.theme ?? createDefaultTheme();
    this.clips = data?.clips ?? [];
    this.teamId = data?.teamId;
    this.userId = data?.userId;
  }

  resetTheme() {
    this.theme = createDefaultTheme()
  }

  findClip(clip: Clip): number {
    return this.findClipById(clip.id);
  }

  findClipById(id: string): number {
    return this.clips.findIndex(item => item.id === id);
  }

  addClip(clip: Clip, pos?: number): boolean {
    const index = this.findClip(clip);
    if (index >= 0) {
      return false;
    }
    if (pos === undefined || isNaN(pos)) {
      this.clips.push(clip);
      return true;
    }
    const p = Math.min(Math.max(0, pos), this.clips.length);
    this.clips.splice(p, 0, clip);
    return true;
  }

  removeClip(clip: Clip | string): boolean {
    if (clip instanceof Clip) {
      return this.removeClip(clip.id);
    }
    const index = this.clips.findIndex(item => item.id === clip);
    if (index < 0) {
      return false;
    }
    this.clips.splice(index, 1);
    return true;
  }

  static fromJSON(json: any): Project {
    const { clips, ...rest } = json;
    return new Project({
      ...rest,
      clips: clips.map((json: any) => {
        return Clip.fromJSON(json);
      }),
    });
  }

  toJSON(): any {
    return {
      id: this.id,
      title: this.title,
      ratio: this.ratio,
      share: this.share,
      meta: this.meta,
      theme: this.theme,
      teamId: this.teamId,
      userId: this.userId,
      clips: this.clips.map(clip => clip.toJSON()),
    };
  }
}
