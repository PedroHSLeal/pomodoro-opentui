import fs from "node:fs/promises";
import path from "node:path";
import { ConsolePosition, createCliRenderer } from "@opentui/core"
import { createRoot } from "@opentui/react"
import { loadAllSounds } from "./audio"
import { App } from "./App"
import { parsePomodoro } from "./cli-input"
import { prepareConfig } from "./services/app-configs"
import { POMODORO_DRAFTS_FOLDER_PATH } from "./services/drafts"

const { config, exportFile } = parsePomodoro();

if (exportFile !== undefined) {
  const isBareFilename = !exportFile.includes("/") && !exportFile.includes("\\") && exportFile.length > 0;
  if (!isBareFilename) {
    process.exit(0);
  }

  const sourcePath = path.join(POMODORO_DRAFTS_FOLDER_PATH, exportFile);
  const exists = await fs.exists(sourcePath);
  if (!exists) {
    process.exit(0);
  }

  await fs.copyFile(sourcePath, path.join(process.cwd(), exportFile));
  process.exit(0);
}

await prepareConfig(config);

const renderer = await createCliRenderer({
  exitOnCtrlC: true,
  consoleOptions: {
    position: ConsolePosition.BOTTOM,
    sizePercent: 50,
  },
  onDestroy() { root.unmount(); renderer.destroy(); }
})

loadAllSounds()

const root = createRoot(renderer)
root.render(<App />);