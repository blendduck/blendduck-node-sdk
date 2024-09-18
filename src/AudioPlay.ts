import { nanoid } from './index';

export class AudioPlay {
  id: string;
  type: string = 'audioPlay';
  url!: string;
  name: string = '';
  offset: number = 0;
  startTime: number;
  endTime: number;
  volume: number = 1;
  fade?: { in: number; out: number };

  constructor(properties: Partial<AudioPlay> = {}) {
    const { id, startTime, endTime, ...rest } = properties ?? {};
    this.id = id ?? nanoid();
    Object.assign(this, rest);
    if (Number(startTime) > 0) {
      this.startTime = Number(startTime);
    } else {
      this.startTime = 0;
    }
    if (Number(endTime) >= this.startTime) {
      this.endTime = Number(endTime);
    } else {
      this.endTime = this.startTime;
    }
  }

  static fromJSON(json: any): AudioPlay {
    return new AudioPlay(json);
  }

  toJSON(): any {
    return {
      id: this.id,
      type: this.type ?? 'audioPlay',
      url: this.url,
      name: this.name,
      offset: this.offset,
      startTime: this.startTime,
      endTime: this.endTime,
      volume: this.volume,
      fade: this.fade,
    };
  }
}
