export type ElementType = 
  | 'text' 
  | 'image' 
  | 'video' 
  | 'shape' 
  | 'emoji'
  | 'lottie'
  | 'group' 
  | 'addon';

export enum AnimationType {
  Move = 'move',
  Scale = 'scale',
  Rotate = 'rotate',
  Opacity = 'opacity',
  Color = 'color',
  Appear = 'appear',
  FadeIn = 'fadeIn',
  SlideIn = 'slideIn',
  MaskIn = 'maskIn',
  ScaleIn = 'scaleIn',
  GrowIn = 'growIn',
  Disappear = 'disappear',
  FadeOut = 'fadeOut',
  SlideOut = 'slideOut',
  MaskOut = 'maskOut',
  ScaleOut = 'scaleOut',
  GrowOut = 'growOut',
}

export enum AnimationEasing {
  Smooth = 'smooth',
  Linear = 'linear',
  EaseIn = 'easeIn',
  EaseOut = 'easeOut',
  EaseInOut = 'easeInOut',
  BackIn = 'backIn',
  BackOut = 'backOut',
  BackInOut = 'backInOut',
  ElasticOut = 'elasticOut',
  BounceOut = 'bounceOut',
}

export enum ProjectRatio {
  Portrait = "9:16",
  Landscape = "16:9",
  Square = "1:1",
  TV = "4:3",
}

export interface ProjectMeta {
  version: string;
  waitBeatSync?: boolean;
}

export type ColorStyle = {
  type: "color",
  color: string,
} | {
  type: "gradient",
  gradient: {
    gradient: string,
    angle: number,
  }
}

export interface BackgroundStyle {
  color: ColorStyle,
  media?: {
    type: string;
    url: string;
  },
}

export interface ProjectAudio {
  name: string,
  url: string,
  volume: number,
}

export interface ProjectTheme {
  background: BackgroundStyle;
  fontFamily: string;
  fontColor: ColorStyle;
  backgroundAudio?: ProjectAudio;
}

export enum ClipTransition {
  None = 'none',
  Fade = 'fade',
  Wipe = 'wipe',
  Flip = 'flip',
  Slide = 'slide',
  Clock = 'clock',
}