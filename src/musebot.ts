// https://github.com/jazz-soft/JZZ-midi-SMF
// https://jazz-soft.net/doc/JZZ/midifile.html

import { clip, midi, scale } from "scribbletune";
// import { Player } from "midi-player-js";
import { exit } from "process";
import {} from 'jzz';

type createMidiFileType = (inputScale?: string) => void;

class Musebot {
  fileName: string;
  constructor(fileName?: string) {
    this.fileName = fileName || "music.mid";
  }
  createMidiFile: createMidiFileType = (inputScale = "C4 major") => {
    if (this.fileName.slice(-4) !== ".mid") {
      console.error("Property 'fileName' must end with .mid file extension.");
      exit(1);
    }

    let pattern: string = "";
    const noteValues: string[] = ["x", "x", "x", "-", "-"];
    let notes: string = scale(inputScale);
    const arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7];

    do {
      pattern = arr
        .map(() => {
          let randomInt: number = Math.floor(Math.random() * noteValues.length);
          return noteValues[randomInt];
        })
        .join("");
    } while (pattern === "xxxxxxxx" || pattern === "--------");

    notes = arr
      .map(() => {
        let randomInt: number = Math.floor(Math.random() * notes.length);
        return notes[randomInt];
      })
      .join(" ");

    const c = clip({
      notes,
      pattern,
    });

    midi(c, this.fileName);
  };
  playMidi = () => {
  // TODO PLAY MIDI FILE

    // const player = new Player((evt: any) => console.log(evt));

    // // console.log(midiBytes);

    // player.loadFile(this.fileName);
    // player.enableTrack(1);
    // player.play();
  };
  start = () => {
    // myMusebot.createMidiFile();
    myMusebot.playMidi();
  };
}
const myMusebot = new Musebot();
myMusebot.start();
