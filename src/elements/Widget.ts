import {
  Element
} from "..";

export class Widget extends Element {
  scope!: string;
  widgetId!: string;

  constructor(properties: Partial<Widget> = {}) {
    super("addon");
    this.initializeProperties(properties);
  }

  static fromJSON(json: any): Widget {
    const element = Element.fromJSON(json) as Partial<Widget>;
    return new Widget(element);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      scope: this.scope,
      widgetId: this.widgetId,
    };
  }
}