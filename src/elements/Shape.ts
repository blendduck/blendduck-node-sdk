import {
  Element,
  ColorStyle
} from "..";

export class Shape extends Element {
  shapeId!: string;
  fill?: ColorStyle;

  constructor(properties: Partial<Shape> = {}) {
    super("shape");
    this.initializeProperties(properties);
  }

  static fromJSON(json: any): Shape {
    const element = Element.fromJSON(json) as Partial<Shape>;
    return new Shape(element);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      shapeId: this.shapeId,
      fill: this.fill,
    };
  }
}