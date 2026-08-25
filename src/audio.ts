import { file } from "bun";

import { Audio } from "@opentui/core";

// @ts-ignore
import click from "../audios/click.wav" with { type: "file" };
// @ts-ignore
import start from "../audios/start-countdown.wav" with { type: "file" };
// @ts-ignore
import finishAll from "../audios/finish-everything.wav" with { type: "file" };

export type Sounds = "click" | "start" | "finishAll";

const SOUNDS: {
  [key in Sounds]: { source: Uint8Array<ArrayBuffer>; id: number | null };
} = {
  click: { source: await file(click).bytes(), id: null },
  start: { source: await file(start).bytes(), id: null },
  finishAll: { source: await file(finishAll).bytes(), id: null },
};

const audio = Audio.create({ autoStart: false });

audio.start();

export function loadAllSounds() {
  for (const key in SOUNDS) {
    SOUNDS[key as Sounds].id = audio.loadSound(SOUNDS[key as Sounds].source);
  }
}

export function play(source: Sounds) {
  if (audio.isStarted()) {
    audio.play(SOUNDS[source].id!);
  }
}
