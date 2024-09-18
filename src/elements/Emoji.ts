import {
  Element
} from "..";

export class Emoji extends Element {
  url!: string;

  constructor(properties: Partial<Emoji> = {}) {
    super("emoji", properties);
  }

  static fromJSON(json: any): Emoji {
    const element = Element.fromJSON(json) as Partial<Emoji>;
    return new Emoji(element);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      url: this.url,
    };
  }
}