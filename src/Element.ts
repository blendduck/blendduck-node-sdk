import { nanoid, ElementType, Animation } from './index';

export class Element {

  id!: string;
  name!: string;
  type: ElementType;
  animations: Animation[] = [];
  children?: Element[];
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;
  rotation: number = 0;
  scale: number = 1;
  opacity: number = 1;

  constructor(type: ElementType, properties: Partial<Element> = {}) {
    this.type = type;
    this.initializeProperties(properties);
  }

  initializeProperties(properties: Partial<Element> = {}) {
    const { id, ...rest } = properties ?? {};
    Object.assign(this, rest);
    this.id = id ?? nanoid();
    this.name = this.name ?? this.id;
  }

  addAnimation(animation: Animation, pos?: number): boolean {
    this.animations.push(animation);
    const index = this.animations.findIndex((a) => a.id === animation.id)
    if (index >= 0) {
      return false;
    }
    if (pos === undefined || isNaN(pos)) {
      this.animations!.push(animation);
      return true;
    }
    const p = Math.min(Math.max(0, pos), this.animations.length);
    this.animations.splice(p, 0, animation);
    return true;
  }

  removeAnimation(animation: Animation | string): boolean {
    if (animation instanceof Animation) {
      return this.removeAnimation(animation.id);
    }
    const index = this.animations.findIndex(item => item.id === animation);
    if (index < 0) {
      return false;
    }
    this.animations.splice(index, 1);
    return true;
  }

  static fromJSON(json: any): Partial<Element> {
    const { 
      type, 
      animations: animationsJSON,
      ...rest 
    } = json;
    const animations = (animationsJSON ?? []).map((json: any) => {
      return Animation.fromJSON(json);
    });
    return {
      ...rest,
      animations,
    };
  }

  toJSON(): any {
    return {
      id: this.id,
      name: this.name ?? this.id,
      type: this.type,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      rotation: this.rotation,
      scale: this.scale,
      opacity: this.opacity,
      animations: this.animations.map(animation => animation.toJSON()),
    };
  }
}