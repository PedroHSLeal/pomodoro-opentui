import { CliRenderer, ConsolePosition, createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { loadAllSounds } from "./audio";
import { args } from "./cli-input-output";

import { App } from "./App";
import { CliError } from "./models/error";

let renderer: CliRenderer;

try {
  const { config, title, showOnly } = await args();

  renderer = await createCliRenderer({
    exitOnCtrlC: true,
    consoleOptions: {
      position: ConsolePosition.BOTTOM,
      sizePercent: 50,
    },
    onDestroy() {
      root.unmount();
      renderer.destroy();
      process.exit();
    },
  });

  loadAllSounds();

  const root = createRoot(renderer);
  root.render(<App config={config} title={title} showOnly={showOnly} />);
} catch (error) {
  if (error instanceof CliError) {
    console.error(error.message);
  }
}
