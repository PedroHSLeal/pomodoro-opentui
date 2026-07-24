export type PomodoroConfig = {
  /** Duration in minutes. */
  pomodoro: number
  /** Duration in minutes. */
  shortBreak: number
  /** Duration in minutes. */
  longBreak: number
  /** A long break happens after every N completed pomodoros. */
  longBreakInterval: number
}

export function validatePomodoro(config: PomodoroConfig): void {
  const fields: Array<keyof PomodoroConfig> = [
    'pomodoro',
    'shortBreak',
    'longBreak',
    'longBreakInterval',
  ]

  for (const field of fields) {
    const value = config[field]
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error(`PomodoroConfig.${field} must be a positive integer, got ${value}. ${JSON.stringify(config)}`)
    }
  }
}