import {
  Element
} from "..";

export class Widget extends Element {
  scope!: string;
  widgetId!: string;

  constructor(properties: Partial<Widget> = {}) {
    super('addon');
    this.initializeProperties(properties);
  }

  static fromJSON(json: any): Widget {
    const element = Element.fromJSON(json) as Partial<Widget>;
    return new Widget(element);
  }

  toExtraJSON() {
    const props = [
      'id',
      'name',
      'type',
      'x',
      'y',
      'width',
      'height',
      'rotation',
      'scale',
      'opacity',
      'animations',
      'children',
    ];

    const json: Record<string, any> = {};
    for (const key in this) {
      if (this.hasOwnProperty(key) && !props.includes(key)) {
        json[key] = this[key];
      }
    }
    return json;
  }

  toJSON() {
    return {
      ...this.toExtraJSON(),
      ...super.toJSON(),
      scope: this.scope,
      widgetId: this.widgetId,
    };
  }
}