type Layout = "title" | "horizontal-stack" | "vertical-stack";

type Content = {
  type: "title" | "text" | "image" | "list";
  /** image + text = hover on image to see text */
  text?: string;
  image?: string;
  list?: string[];
};

export type PageData = {
  id: number;
  layout: Layout;
  content: Content[];
};

export type BoxData = { id: number; colour?: string; content: PageData[] };
type BoxesData = BoxData[];

// INTRO
const introTitle: PageData = {
  id: 0,
  layout: "title",
  content: [
    { type: "title", text: "The British Coal Story" },
    { type: "text", text: "An interactive journey" },
  ],
};
const introMenu: PageData = {
  id: 1,
  layout: "horizontal-stack",
  content: [
    {
      type: "list",
      list: [
        "Lesson overview and the SDGs",
        "Where does coal come from?",
        "Coal as a British energy source",
        "Coal and the Environment",
        "The decline of British coal",
        "Socioeconomic tensions",
        "Coal in today’s world",
        "Looking forward",
        "Summary",
      ],
    },
    { type: "image", image: "" },
  ],
};

const introOverview: PageData = {
  id: 2,
  layout: "horizontal-stack",
  content: [
    { type: "title", text: "Lesson overview and the UN SDGs" },
    {
      type: "list",
      list: [
        "The UN published its 17 sustainable development goals (SDG) in 2015 as tangible vectors to achieve peace and prosperity throughout the globe. This lesson will explore a topic in British history that ties in with two of these goals:",
        "SDG 7: Affordable and clean energy",
        "SDG 11: Sustainable cities and communities",
      ],
    },
    { type: "image", image: "" },
    { type: "image", image: "" },
  ],
};

const sourceTitle: PageData = {
  id: 3,
  layout: "title",
  content: [{ type: "title", text: "Where does coal come from?" }],
};

const sourceTwo: PageData = {
  id: 4,
  layout: "vertical-stack",
  content: [
    {
      type: "list",
      list: [
        "370 million years ago, the island of Britain was covered in a hot, swampy jungle. When the animals and plants in this jungle died, they were buried upon each other in thick, anoxic conditions.",
        "Coal was slowly formed over the next few hundred million years from the slow burial and transformation process of this organic matter.",
      ],
    },
    { type: "image", image: "" },
  ],
};

export const boxesData: BoxesData = [
  { id: 1, colour: "green", content: [introTitle, introMenu, introOverview] },
  { id: 5, colour: "blue", content: [sourceTitle, sourceTwo] },
];
