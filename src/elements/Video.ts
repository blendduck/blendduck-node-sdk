import {
  Element
} from "..";

export class Video extends Element {
  radius: number = 0;
  volume: number = 1;
  loop: boolean = false;
  url!: string;

  constructor(properties: Partial<Video> = {}) {
    super("video");
    this.initializeProperties(properties);
  }

  static fromJSON(json: any): Video {
    const element = Element.fromJSON(json) as Partial<Video>;
    return new Video(element);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      radius: this.radius,
      url: this.url,
      volume: this.volume,
      loop: this.loop,
    };
  }
}