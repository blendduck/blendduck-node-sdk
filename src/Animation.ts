import { nanoid, AnimationType } from './index';

export class Animation {
  id: string;
  type: AnimationType;
  startTime: number;
  endTime: number;
  easing: string = 'smooth';
  easingOptions?: any;
  initValue?: any;
  toValue?: any;
  data?: Record<string, any>;

  constructor(type: AnimationType, properties: Partial<Animation> = {}) {
    this.type = type;
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

  static fromJSON(json: any): Animation {
    const { type, ...rest } = json;
    return new Animation(type, rest);
  }

  toJSON(): any {
    return {
      id: this.id,
      type: this.type,
      startTime: this.startTime,
      endTime: this.endTime,
      easing: this.easing,
      easingOptions: this.easingOptions,
      initValue: this.initValue,
      toValue: this.toValue,
      data: this.data,
    };
  }
}
