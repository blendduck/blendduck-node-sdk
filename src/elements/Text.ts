import {
  Element
} from "..";

export type TextStyle = "none" | "shadow" | "stack" | "stage" | "neon" | "glitch";

export type TextColor = {
  type: "color",
  color: string
} | {
  type: "gradient",
  gradient: any,
  deg: number,
}

export type TextAlign = "left" | "center" | "right";

export class Text extends Element {
  color: TextColor | null | undefined;
  fontFamily: string | null | undefined;
  fontWeight: number = 400;
  fontSize: number = 30;
  bold: boolean = false;
  italic: boolean = false;
  underline: boolean = false;
  strikethrough: boolean = false;
  textStyle: TextStyle = "none";
  text: string = "";
  textAlign: TextAlign = "left";
  autoSize: boolean = true;

  constructor(properties: Partial<Text> = {}) {
    super("text");
    this.initializeProperties(properties);
  }

  static fromJSON(json: any): Text {
    const element = Element.fromJSON(json) as Partial<Text>;
    return new Text(element);
  }

  toJSON() {
    return {
      ...super.toJSON(),
      color: this.color,
      fontFamily: this.fontFamily,
      fontWeight: this.fontWeight,
      fontSize: this.fontSize,
      bold: this.bold,
      italic: this.italic,
      underline: this.underline,
      strikethrough: this.strikethrough,
      textStyle: this.textStyle,
      text: this.text,
      textAlign: this.textAlign,
      autoSize: this.autoSize,
    };
  }
}