import {
  Element
} from "..";

export class Image extends Element {
  radius: number = 0;
  url!: string;

  constructor(properties: Partial<Image> = {}) {
    super("image");
    this.initializeProperties(properties);
  }

  static fromJSON(json: any): Image {
    const element = Element.fromJSON(json) as Partial<Image>;
    return new Image(element);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      radius: this.radius,
      url: this.url,
    };
  }
}