import { nanoid, Element, AudioPlay, ClipTransition, BackgroundStyle } from './index';
import { parseElement } from './utils';

export class Clip {
  id: string;
  duration: number;
  durationLock: boolean = false;
  elements: Element[] = [];
  audios: AudioPlay[] = [];
  transition: ClipTransition = ClipTransition.None;
  background?: BackgroundStyle;

  constructor(duration: number, data?: Partial<Clip>) {
    this.id = nanoid();
    this.duration = duration;
    if (data) {
      this.durationLock = data.durationLock || this.durationLock;
      this.transition = data.transition || this.transition;
      this.background = data.background || this.background;
      this.elements =data.elements || [];
      this.audios = data.audios || [];
    }
  }

  addElement(element: Element, pos?: number): boolean {
    const index = this.elements.findIndex((el) => el.id === element.id)
    if (index >= 0) {
      return false;
    }
    if (pos === undefined || isNaN(pos)) {
      this.elements.push(element);
      return true;
    }
    const p = Math.min(Math.max(0, pos), this.elements.length);
    this.elements.splice(p, 0, element);
    return true;
  }

  removeElement(element: Element | string): boolean {
    if (element instanceof Element) {
      return this.removeElement(element.id);
    }
    const index = this.elements.findIndex(item => item.id === element);
    if (index < 0) {
      return false;
    }
    this.elements.splice(index, 1);
    return true;
  }

  addAudioPlay(audio: AudioPlay, pos?: number): boolean {
    const index = this.audios.findIndex((el) => el.id === audio.id)
    if (index >= 0) {
      return false;
    }
    if (pos === undefined || isNaN(pos)) {
      this.audios.push(audio);
      return true;
    }
    const p = Math.min(Math.max(0, pos), this.audios.length);
    this.audios.splice(p, 0, audio);
    return true;
  }

  removeAudioPlay(audio: AudioPlay | string): boolean {
    if (audio instanceof AudioPlay) {
      return this.removeAudioPlay(audio.id);
    }
    const index = this.audios.findIndex(item => item.id === audio);
    if (index < 0) {
      return false;
    }
    this.audios.splice(index, 1);
    return true;
  }

  /**
   * clone the clip to a new one
   * @returns Clip
   */
  clone(): Clip {
    const json = this.toJSON()
    return Clip.fromJSON({
      ...json,
      id: nanoid()
    })
  }


  static fromJSON(json: any): Clip {
    const { elements: elementsJSON, audios: audiosJSON, ...rest } = json;
    const elements = elementsJSON.map((json: any) => {
      return parseElement(json);
    });
    const audios = audiosJSON ? audiosJSON.map((json: any) => {
      return AudioPlay.fromJSON(json);
    }) : [];
    return new Clip(rest.duration, {
      ...rest,
      elements,
      audios,
    });
  }

  toJSON(): any {
    return {
      id: this.id,
      duration: this.duration,
      durationLock: this.durationLock,
      transition: this.transition,
      background: this.background,
      elements: this.elements.map(element => element.toJSON()),
      audios: this.audios.map(audio => audio.toJSON()),
    };
  }
}
