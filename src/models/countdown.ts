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