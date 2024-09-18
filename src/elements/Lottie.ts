import {
  Element
} from "..";

export class Lottie extends Element {
  url!: string;

  constructor(properties: Partial<Lottie> = {}) {
    super("lottie", properties);
  }

  static fromJSON(json: any): Lottie {
    const element = Element.fromJSON(json) as Partial<Lottie>;
    return new Lottie(element);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      url: this.url,
    };
  }
}