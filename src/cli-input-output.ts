import { parseArgs } from "util";
import { type PomodoroConfig } from "./models/countdown";
import { CliError } from "./models/error";
import { draftService } from "./services/drafts";

export type CliInput = {
  pomodoro: string;
  "short-break": string;
  "long-break": string;
  interval: string;
  export: string;
};

export async function args() {
  const cliArgs = parseCliArgs();

  const { config, title } = parsePomodoro(cliArgs);

  if (cliArgs.export) {
    const { copyDraft } = draftService();
    await copyDraft(cliArgs.export, process.cwd());
    process.exit();
  }

  return { config, title, showOnly: cliArgs["only"] };
}

function parseCliArgs() {
  const { values } = parseArgs({
    args: Bun.argv,
    options: {
      pomodoro: { type: "string", short: "p", default: "15" },
      "short-break": { type: "string", short: "s", default: "5" },
      "long-break": { type: "string", short: "l", default: "15" },
      interval: { type: "string", short: "i", default: "3" },
      export: { type: "string", short: "e" },
      title: { type: "string", short: "t" },
      only: { type: "string", short: "o" },
    },
    strict: true,
    allowPositionals: true,
  });

  return values;
}

function parsePomodoro(cliArgs: ReturnType<typeof parseCliArgs>) {
  const config: PomodoroConfig = {
    pomodoro: parseInt(cliArgs.pomodoro),
    shortBreak: parseInt(cliArgs["short-break"]),
    longBreak: parseInt(cliArgs["long-break"]),
    longBreakInterval: parseInt(cliArgs.interval),
  };

  validatePomodoro(config);

  return { config, title: cliArgs.title };
}

function validatePomodoro(args: PomodoroConfig): void {
  for (const [prop, value] of Object.entries(args)) {
    if (!Number.isInteger(value) || value <= 0) {
      throw new CliError(`$.${prop} must be a positive integer, got ${value}`);
    }
  }
}
