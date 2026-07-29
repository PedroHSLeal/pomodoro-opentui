# Pomodoro CLI

This is a simple pomodoro TUI with a text editor to save your infos, all in one place

![image](./docs/pomodoro-full-size.gif)

## How it works

when you run the generated executable for the first time, it will create a pomodoro folder where it will keep all your drafts.
It has a two main sections:

- the pomodoro timer and its controls to pause, reset, and play the timer
- the drafts section where it contains a simple list of created drafts and the proper draft editor

it can run in a normal screen, so that you can counter your time and write some drafts, and in a minimal size in your terminal. in this mode, just the timer works, and you can use SPACE to pause/resume the timer

![focs](./docs/pomodoro-focus.gif)

## Technical details

create `pomodoro/` folder inside your `./$user/config/` folder

## Build from source

before run/compile this project, install Bun runtime. After, run these commands

```bash
bun install
bun run compile
```

the output of the command will be `pomodoro.exe` executable. Just run this inside your terminal!

## Roadmap

### v1

- [x] pomodoro counter
- [x] simple text editor - drafts
- [x] make pomodoro and text editor fit in small terminal sizes

### v2

- [ ] make text editor configs editable
