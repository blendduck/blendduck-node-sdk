import { z } from "zod";
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
extendZodWithOpenApi(z);

// Schema for color
const ColorSchema = z.object({
  type: z.literal("color"),
  color: z.string(),
}).openapi('PureColor');

// Schema for color gradient
const GradientSchema = z.object({
  type: z.literal("gradient"),
  gradient: z.object({
    gradient: z.string(),
    angle: z.number()
  })
}).openapi('GradientColor');

// Schema for background object
const BackgroundSchema = z.object({
  color: ColorSchema.or(GradientSchema),
  media: z.object({
    type: z.string(),
    name: z.string().nullish(),
    url: z.string().url()
  }).nullish()
}).openapi('Background');


// Schema for animation object
const AnimationSchema = z.object({
  id: z.string(),
  type: z.enum([
    'move','scale','rotate','opacity','color',
    'appear','fadeIn','slideIn','maskIn','scaleIn',
    'disappear','fadeOut','slideOut','maskOut','scaleOut']),
  startTime: z.number().min(0),
  endTime: z.number().min(0),
  easing: z.string(),
}).openapi('Animation');

const BaseElementSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  type: z.string(),
  x: z.number(),
  y: z.number(),
  width: z.number().min(0),
  height: z.number().min(0),
  rotation: z.number(),
  scale: z.number().min(0),
  opacity: z.number().min(0).max(1),
  animations: z.array(AnimationSchema),
}).openapi('BaseElement');

// Schema for Text
const TextSchema = BaseElementSchema.extend({
  type: z.literal("text"),
  text: z.string(),
  fontWeight: z.number(),
  fontSize: z.number(),
  bold: z.boolean(),
  italic: z.boolean(),
  underline: z.boolean(),
  strikethrough: z.boolean(),
  textStyle: z.enum(["none","shadow","stack","stage","neon","glitch"]),
  textAlign: z.enum(["left","center","right"]),
  autoSize: z.boolean(),
}).openapi('Text');

const ImageSchema = BaseElementSchema.extend({
  type: z.literal('image'),
  radius: z.number(),
  url: z.string().url(),
}).openapi('Image');

const VideoSchema = BaseElementSchema.extend({
  type: z.literal('video'),
  radius: z.number(),
  url: z.string().url(),
  volume: z.number().min(0).max(1),
  loop: z.boolean(),
}).openapi('Video');

const EmojiSchema = BaseElementSchema.extend({
  type: z.literal('emoji'),
  radius: z.number(),
  url: z.string().url(),
}).openapi('Emoji');

const ShapeSchema = BaseElementSchema.extend({
  type: z.literal('shape'),
  shapeId: z.number(),
  fill: ColorSchema.or(GradientSchema).nullish(),
}).openapi('Shape');

const WidgetSchema = BaseElementSchema.extend({
  type: z.literal('addon'),
  scope: z.string(),
  widgetId: z.string(),
}).openapi('Element');

// 定义 GroupSchema，使用 any[] 作为临时类型
const GroupSchema = BaseElementSchema.extend({
  type: z.literal('group'),
  children: z.array(z.any()),
}).openapi('Group');

// 定义 ElementSchema
const ElementSchema = z.discriminatedUnion("type", [
  TextSchema,
  ImageSchema,
  VideoSchema,
  EmojiSchema,
  ShapeSchema,
  WidgetSchema,
  GroupSchema,
]).openapi('Element');

// 更新 GroupSchema 的 children 类型
// @ts-ignore
GroupSchema.shape.children = z.array(ElementSchema) as z.ZodArray<typeof ElementSchema>;

// 导出类型
type Element = z.infer<typeof ElementSchema>;

// Schema for audio object
const AudioSchema = z.object({
  id: z.string(),
  type: z.literal("audioPlay"),
  url: z.string().url(),
  name: z.string(),
  offset: z.number().min(0),
  startTime: z.number().min(0),
  endTime: z.number().min(0),
  volume: z.number().min(0).max(1),
  fade: z.object({
    in: z.number().default(0),
    out: z.number().default(0)
  }).nullish().default(null),
}).openapi('AudioPlay');

// Schema for clip object
export const ClipSchema = z.object({
  id: z.string(),
  duration: z.number().min(0.01),
  durationLock: z.boolean(),
  transition: z.enum(['none','fade','wipe','flip','slide','clock']),
  elements: z.array(ElementSchema),
  audios: z.array(AudioSchema).nullish(),
  background: BackgroundSchema.nullish(),
}).openapi('ProjectClip')

// Schema for theme object
export const ThemeSchema = z.object({
  background: BackgroundSchema,
  fontFamily: z.string(),
  fontColor: ColorSchema.or(GradientSchema),
}).openapi('ProjectTheme');

// Schema for meta object
export const MetaSchema = z.object({
  version: z.string()
}).openapi('ProjectMeta');

// Root schema for the entire JSON
export const ProjectSchema = z.object({
  id: z.string().nullish(),
  title: z.string(),
  ratio: z.string(),
  share: z.boolean(),
  meta: MetaSchema,
  theme: ThemeSchema,
  clips: z.array(ClipSchema),
}).openapi('Project')