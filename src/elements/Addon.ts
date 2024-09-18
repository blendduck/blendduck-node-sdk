import {
  Element
} from "..";

export class Addon extends Element {
  scope!: string;
  widgetId!: string;

  constructor(properties: Partial<Addon> = {}) {
    super("addon", properties);
  }

  static fromJSON(json: any): Addon {
    const element = Element.fromJSON(json) as Partial<Addon>;
    return new Addon(element);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      scope: this.scope,
      widgetId: this.widgetId,
    };
  }
}