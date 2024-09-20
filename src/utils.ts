import { customAlphabet } from 'nanoid';
import { 
  Element,
  Text,
  Image,
  Video,
  Emoji,
  Group,
  Widget,
  Shape,
  Lottie,
} from '.';

// 定义一个不包含特殊字符的字符集
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export const nanoid = customAlphabet(alphabet, 15);

export const parseElement = (json: any): Element => {
  switch (json?.type) {
    case 'text':
      return Text.fromJSON(json)
    case 'shape':
      return Shape.fromJSON(json)
    case 'image':
      return Image.fromJSON(json)
    case 'video':
      return Video.fromJSON(json)
    case 'emoji':
      return Emoji.fromJSON(json)
    case 'lottie':
      return Lottie.fromJSON(json)
    case 'group':
      return Group.fromJSON(json)
    case 'addon':
    case 'widget':
      return Widget.fromJSON(json)
    default:
      throw new Error(`invalid Element type ${json?.type}`)
  }
}