import { useCallback, useEffect, useRef, useState } from "react";
import { type PomodoroConfig } from "../models/countdown";

export enum TimerStage {
  POMODORO = "pomodoro",
  SHORT_BREAK = "shortBreak",
  LONG_BREAK = "longBreak",
}

export type CountdownState = Readonly<{
  stage: TimerStage;
  remainingSeconds: number;
  formattedTime: string;
}>;

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3600;

/** Turns a number of seconds into "MM:SS" (or "HH:MM:SS" when over an hour). */
export function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / SECONDS_PER_HOUR);
  const minutes = Math.floor(
    (totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE,
  );
  const seconds = totalSeconds % SECONDS_PER_MINUTE;

  const pad = (n: number) => String(n).padStart(2, "0");

  return hours > 0
    ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    : `${pad(minutes)}:${pad(seconds)}`;
}

/** How many seconds a given stage lasts, based on the config. */
export function getDurationSeconds(
  config: PomodoroConfig,
  stage: TimerStage,
): number {
  const minutes = {
    [TimerStage.POMODORO]: config.pomodoro,
    [TimerStage.SHORT_BREAK]: config.shortBreak,
    [TimerStage.LONG_BREAK]: config.longBreak,
  }[stage];

  return minutes * SECONDS_PER_MINUTE;
}

const ONE_SECOND_MS = 1000;

export type CountdownController = {
  stage: TimerStage;
  remainingSeconds: number;
  formattedTime: string;
  isRunning: boolean;
  play: () => void;
  pause: () => void;
  reset: () => void;
};

export function getNextStage(
  current: TimerStage,
  completedPomodoros: number,
  config: PomodoroConfig,
): TimerStage {
  if (current !== TimerStage.POMODORO) {
    return TimerStage.POMODORO;
  }

  const isTimeForLongBreak =
    completedPomodoros % config.longBreakInterval === 0;
  return isTimeForLongBreak ? TimerStage.LONG_BREAK : TimerStage.SHORT_BREAK;
}

export function useCountdown(config: PomodoroConfig): CountdownController {
  const [stage, setStage] = useState<TimerStage>(TimerStage.POMODORO);
  const [remainingSeconds, setRemainingSeconds] = useState(() =>
    getDurationSeconds(config, TimerStage.POMODORO),
  );
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completedPomodorosRef = useRef(0);
  const stageRef = useRef(stage);
  const remainingRef = useRef(remainingSeconds);

  stageRef.current = stage;
  remainingRef.current = remainingSeconds;

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startStage = useCallback(
    (next: TimerStage) => {
      setStage(next);
      setRemainingSeconds(getDurationSeconds(config, next));
    },
    [config],
  );

  const finishStage = useCallback(() => {
    const current = stageRef.current;
    if (current === TimerStage.POMODORO) {
      completedPomodorosRef.current += 1;
    }
    startStage(getNextStage(current, completedPomodorosRef.current, config));
  }, [config, startStage]);

  const tick = useCallback(() => {
    if (remainingRef.current > 0) {
      setRemainingSeconds((s) => s - 1);
    } else {
      finishStage();
    }
  }, [finishStage]);

  const playTimer = useCallback(() => {
    if (intervalRef.current !== null) return;
    setIsRunning(true);
    intervalRef.current = setInterval(tick, ONE_SECOND_MS);
  }, [tick]);

  const pauseTimer = useCallback(() => {
    clearTimer();
    setIsRunning(false);
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    completedPomodorosRef.current = 0;
    startStage(TimerStage.POMODORO);
  }, [clearTimer, startStage]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  return {
    stage,
    remainingSeconds,
    formattedTime: formatTime(remainingSeconds),
    isRunning,
    play: playTimer,
    pause: pauseTimer,
    reset,
  };
}
