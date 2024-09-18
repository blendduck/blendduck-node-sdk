# @blendduck/node-sdk

## Get Started

Install the Node.js SDK

```bash
npm install @blendduck/node-sdk
```

## Setup

```ts
import BlendDuck, {
  Project,
} from "@blendduck/node-sdk";

const client = new BlendDuck({
  apiKey: process.env.BLENDDUCK_API_KEY
})
```

## List Projects and retrieve project by id

```ts
import BlendDuck, {
  Project,
} from "@blendduck/node-sdk";

const client = new BlendDuck({
  apiKey: process.env.BLENDDUCK_API_KEY
})

const project = await client.projects.get(`<Your Project ID>`);

// list projects, default return the top 20 items
const projects = await client.projects.list()

// get more 20 items
const moreProjects = await client.projects.list({
  offset: 1, // default 0
  limit: 20,
})
```


## Create a new project

```ts
import BlendDuck, {
  Project,
  Clip,
  Text,
  Image,
  Video,
  Group,
  Animation,
  AnimationType,
  AnimationEasing,
  AudioPlay
} from "@blendduck/node-sdk";

const client = new BlendDuck({
  apiKey: process.env.BLENDDUCK_API_KEY
})

// create project
const project = new Project();

// add a new clip and set the duration to 5 second
const clip = new Clip(5);
project.addClip(clip);

// add a text to a clip
const textElement = new Text();
textElement.text = "Hello";
clip.addElement(textElement);

// add an animation to the text
const fade = new Animation(AnimationType.FadeIn)
fade.startTime = 0;
fade.endTime = 0.3;
fade.easing = AnimationEasing.Smooth;
textElement.addAnimation(fade);

// add an audio to the clip
const audio = new AudioPlay({ url: "https://s.blendduck.com/audios/motivation.mp3" })
clip.addAudioPlay(audio)

// create a new project
const id = await client.projects.create(project)

// navigate to projectLink and preview the project in the BlendDuck editor
const editLink = `https://blendduck.com/editor/${id}`
console.log(editLink)
```


## Update Project

```ts
import BlendDuck, {
  Project,
  Clip,
} from "@blendduck/node-sdk";

const client = new BlendDuck({
  apiKey: process.env.BLENDDUCK_API_KEY
})

const project = await client.projects.get(`<Your Project ID>`)

// update project
project.title = "New Title"

project.theme.fontColor = {
  type: "color",
  color: "#00ff33ff",
}

// update a clip
project.clips[0].elements[0].animations[0].startTime = 0.5

// add a new clip
const clip = new Clip(5);
project.addClip(clip);

await client.projects.update(project)
```

## Delete Project

```ts
import BlendDuck from "@blendduck/node-sdk";

const client = new BlendDuck({
  apiKey: process.env.BLENDDUCK_API_KEY
})

await client.projects.delete(`<Your Project ID>`)
```