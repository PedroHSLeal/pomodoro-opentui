import { ConsolePosition, createCliRenderer } from "@opentui/core"
import { createRoot } from "@opentui/react"
import { loadAllSounds } from "./audio"
import { App } from "./App"
import { parsePomodoro } from "./cli-input"
import { prepareConfig } from "./services/app-configs"

const config = parsePomodoro();

await prepareConfig(config);

const renderer = await createCliRenderer({
  exitOnCtrlC: true,
  consoleOptions: {
    position: ConsolePosition.BOTTOM,
    sizePercent: 50,
  },
  onDestroy() { root.unmount() } 
})

loadAllSounds()

let root = createRoot(renderer)
root.render(<App />)
