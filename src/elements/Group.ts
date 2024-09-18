import {
  Element,
} from "..";
import { parseElement } from "../utils";

export class Group extends Element {

  children: Element[] = [];

  constructor(properties: Partial<Group> = {}) {
    super("group", properties);
  }

  addElement(element: Element, pos?: number): boolean {
    if (this.type !== "group") {
      return false;
    }
    const index = this.children.findIndex((el) => el.id === element.id)
    if (index >= 0) {
      return false;
    }
    if (pos === undefined || isNaN(pos)) {
      this.children!.push(element);
      return true;
    }
    const p = Math.min(Math.max(0, pos), this.children!.length);
    this.children!.splice(p, 0, element);
    return true;
  }

  removeElement(element: Element | string): boolean {
    if (this.type !== "group") {
      return false;
    }
    if (element instanceof Element) {
      return this.removeElement(element.id);
    }
    const index = this.children.findIndex(item => item.id === element);
    if (index < 0) {
      return false;
    }
    this.children!.splice(index, 1);
    return true;
  }

  static fromJSON(json: any): Group {
    const { children, ...rest } = Element.fromJSON(json) as Partial<Group>;
    const elementArray = children!.map((json: any) => {
      return parseElement(json)
    });
    return new Group({
      ...rest,
      children: elementArray
    })
  }

  toJSON() {
    return {
      ...super.toJSON(),
      children: this.children.map((el) => el.toJSON())
    };
  }
}