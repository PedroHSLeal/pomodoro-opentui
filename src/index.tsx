import { CliRenderer, ConsolePosition, createCliRenderer } from "@opentui/core"
import { createRoot } from "@opentui/react"
import { loadAllSounds } from "./audio"
import { parseCliArgs, parsePomodoro } from "./cli-input-output"

import { App } from "./App"
import { draftService } from "./services/drafts"
import { CliError } from "./models/error"

let renderer: CliRenderer;

try {
  const cliArgs = parseCliArgs();

  const { config, title } = parsePomodoro(cliArgs);

  if (cliArgs.export) {
    const { copyDraft } = draftService();
    await copyDraft(cliArgs.export, process.cwd());
    process.exit();
  }

  renderer = await createCliRenderer({
    exitOnCtrlC: true,
    consoleOptions: {
      position: ConsolePosition.BOTTOM,
      sizePercent: 50,
    },
    onDestroy() { root.unmount(); renderer.destroy(); process.exit(); }
  })

  loadAllSounds()

  const root = createRoot(renderer)
  root.render(<App config={config} title={title} showOnly={cliArgs.only} />);
} catch (error) {
  if (error instanceof CliError) {
    console.error(error.message);
  }
}