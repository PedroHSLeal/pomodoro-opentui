import { parseArgs } from "util";
import { validatePomodoro, type PomodoroConfig } from "./models/countdown";

export type CliInput = {
  pomodoro: string,
  "short-break": string,
  "long-break": string,
  interval: string,
  "export": string
}

export function parsePomodoro() {
  const { values } = parseArgs({
    args: Bun.argv,
    options: {
      pomodoro: { type: "string", short: "p", default: "15" },
      "short-break": { type: "string", short: "s", default: "5" },
      "long-break": { type: "string", short: "l", default: "15" },
      interval: { type: "string", short: "i", default: "3" },
      "export": { type: "string", short: "e" },
    },
    strict: true,
    allowPositionals: true
  });

  const config: PomodoroConfig = { pomodoro: parseInt(values.pomodoro), shortBreak: parseInt(values["short-break"]), longBreak: parseInt(values["long-break"]), longBreakInterval: parseInt(values.interval) };

  validatePomodoro(config);

  return { config, exportFile: values["export"] };
}
