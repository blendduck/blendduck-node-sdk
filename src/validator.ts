import { z } from "zod";

// Schema for color
const ColorSchema = z.object({
  type: z.literal("color"),
  color: z.string(),
});

// Schema for color gradient
const GradientSchema = z.object({
  type: z.literal("gradient"),
  gradient: z.object({
    gradient: z.string(),
    angle: z.number()
  })
});

// Schema for background object
const BackgroundSchema = z.object({
  color: ColorSchema.or(GradientSchema),
  media: z.object({
    type: z.string(),
    name: z.string().nullish(),
    url: z.string().url()
  }).nullish()
});

// Schema for theme object
const ThemeSchema = z.object({
  background: BackgroundSchema,
  fontFamily: z.string(),
  fontColor: ColorSchema.or(GradientSchema),
});

// Schema for animation object
const AnimationSchema = z.object({
  id: z.string(),
  type: z.enum([
    'move','scale','rotate','opacity','color',
    'appear','fadeIn','slideIn','maskIn','shrinkIn', 'growIn',
    'disappear','fadeOut','slideOut','maskOut','shrinkOut', 'growOut']),
  startTime: z.number().min(0),
  endTime: z.number().min(0),
  easing: z.string(),
});

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
})

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
});

const ImageSchema = BaseElementSchema.extend({
  type: z.literal('image'),
  radius: z.number(),
  url: z.string().url(),
});

const VideoSchema = BaseElementSchema.extend({
  type: z.literal('video'),
  radius: z.number(),
  url: z.string().url(),
  volume: z.number().min(0).max(1),
  loop: z.boolean(),
});

const EmojiSchema = BaseElementSchema.extend({
  type: z.literal('emoji'),
  radius: z.number(),
  url: z.string().url(),
});

const LottieSchema = BaseElementSchema.extend({
  type: z.literal('lottie'),
  url: z.string().url(),
});

const ShapeSchema = BaseElementSchema.extend({
  type: z.literal('shape'),
  shapeId: z.number(),
  fill: ColorSchema.or(GradientSchema).nullish(),
});

const WidgetSchema = BaseElementSchema.extend({
  type: z.literal('addon'),
  package: z.string(),
  widgetId: z.string(),
});

const ElementSchema: z.ZodType<Element> = z.lazy(() => 
  z.discriminatedUnion("type", [
    TextSchema,
    ImageSchema,
    VideoSchema,
    EmojiSchema,
    ShapeSchema,
    LottieSchema,
    GroupSchema,
    WidgetSchema
  ])
);

const GroupSchema = BaseElementSchema.extend({
  type: z.literal('group'),
  children: z.array(ElementSchema),
});

// 定义 Element 类型
type Element = 
  | z.infer<typeof TextSchema>
  | z.infer<typeof ImageSchema>
  | z.infer<typeof VideoSchema>
  | z.infer<typeof EmojiSchema>
  | z.infer<typeof LottieSchema>
  | z.infer<typeof ShapeSchema>
  | z.infer<typeof WidgetSchema>
  | { type: 'group', id: string, children: Element[] };


// Schema for audio object
const AudioSchema = z.object({
  id: z.string(),
  type: z.literal("audioPlay"),
  url: z.string().url(),
  name: z.string(),
  offset: z.number().min(0),
  startTime: z.number().min(0),
  endTime: z.number().min(0),
  fade: z.object({
    in: z.coerce.number().default(0),
    out: z.coerce.number().default(0)
  }).nullish().default(null),
  volume: z.number().min(0).max(1),
});

// Schema for clip object
const clipSchema = z.object({
  id: z.string(),
  duration: z.number().min(0.01),
  durationLock: z.boolean(),
  transition: z.enum(['none','fade','wipe','flip','slide','clock']),
  elements: z.array(ElementSchema),
  audios: z.array(AudioSchema).nullish(),
  background: BackgroundSchema.nullish(),
});

// Schema for meta object
const metaSchema = z.object({
  version: z.string(),
});

// Root schema for the entire JSON
const ProjectSchema = z.object({
  id: z.string().nullish(),
  title: z.string(),
  ratio: z.string(),
  share: z.boolean(),
  meta: metaSchema,
  theme: ThemeSchema,
  clips: z.array(clipSchema),
});

export const safeParse = (json: any) => {
  return ProjectSchema.passthrough().safeParse(json)
}

export const parse = (json: any) => {
  return ProjectSchema.passthrough().parse(json)
}