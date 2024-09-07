export const MAPS: Record<string, { src: string }> = {
  "abyss": {
     src: "/maps/abyss.webp"
  },
  "ascent": {
     src: "/maps/ascent.webp"
  },
  "bind": {
     src: "/maps/bind.webp"
  },
  "breeze": {
     src: "/maps/breeze.webp"
  },
  "fracture": {
     src: "/maps/fracture.webp"
  },
  "haven": {
     src: "/maps/haven.webp"
  },
  "icebox": {
     src: "/maps/icebox.webp"
  },
  "lotus": {
     src: "/maps/lotus.webp"
  },
  "pearl": {
     src: "/maps/pearl.webp"
  },
  "split": {
     src: "/maps/split.webp"
  },
  "sunset": {
     src: "/maps/sunset.webp"
  },
  "playoffs": {
     src: "/maps/playoffs.webp"
  },
};

export type MapName = keyof typeof MAPS;