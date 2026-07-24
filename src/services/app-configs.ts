import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { validatePomodoro, type PomodoroConfig } from '../models/countdown';

export const POMODORO_FOLDER_PATH = path.join(os.homedir(), '.config', 'pomodoro');
export const POMODORO_FILE_PATH = path.join(POMODORO_FOLDER_PATH, "config.json");

export type ConfigData = PomodoroConfig;

export function configService() {
  const validations = [
    validatePomodoro
  ]

  async function createConfigFolder() {
    if (!(await fs.exists(POMODORO_FOLDER_PATH))) {
      await fs.mkdir(POMODORO_FOLDER_PATH, { recursive: true });
    }
  }

  async function writeConfigFile(value: string) {
    await fs.writeFile(POMODORO_FILE_PATH, value, { encoding: "utf-8" });;
  }

  async function createConfig(values: ConfigData) {
    await createConfigFolder();
    await writeConfigFile(JSON.stringify(values));
  }

  async function updateConfig(values: ConfigData) {
    await writeConfigFile(JSON.stringify(values));
  }

  async function getConfig() {
    let configText = await fs.readFile(POMODORO_FILE_PATH, { encoding: "utf-8" });
    let config = JSON.parse(configText.trim()) as ConfigData;

    validations.forEach(v => v(config));

    return config;
  }

  return {
    createConfig,
    updateConfig,
    getConfig
  }
}

export async function prepareConfig(values: PomodoroConfig) {
  const { createConfig } = configService();
  await createConfig(values);
}