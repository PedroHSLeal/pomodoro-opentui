import fs from "node:fs/promises";
import path from "node:path";

import { POMODORO_FOLDER_PATH } from "./app-configs";
import { CliError } from "../models/error";

export const POMODORO_DRAFTS_FOLDER_PATH = path.join(
  POMODORO_FOLDER_PATH,
  "drafts",
);

export function draftService() {
  async function createDraftsFolder() {
    await fs.mkdir(POMODORO_DRAFTS_FOLDER_PATH, { recursive: true });
  }

  async function getDraftsFiles() {
    const list = [];

    await createDraftsFolder();

    for await (const element of fs.glob("*", {
      cwd: POMODORO_DRAFTS_FOLDER_PATH,
    })) {
      if (element.includes(".")) list.push(element);
    }

    return list;
  }

  async function writeDraft(fileName: string, content: string) {
    const filePath = path.join(POMODORO_DRAFTS_FOLDER_PATH, fileName);
    await fs.writeFile(filePath, content, { encoding: "utf8" });
  }

  async function readDraft(fileName: string) {
    const filePath = path.join(POMODORO_DRAFTS_FOLDER_PATH, fileName);
    return await fs.readFile(filePath, { encoding: "utf8" });
  }

  async function deleteDraft(fileName: string) {
    const filePath = path.join(POMODORO_DRAFTS_FOLDER_PATH, fileName);
    await fs.rm(filePath);
  }

  async function copyDraft(fileName: string, destination: string) {
    const sourcePath = path.join(
      POMODORO_DRAFTS_FOLDER_PATH,
      fileName.replace("/", "").replace("\\", ""),
    );
    const exists = await fs.exists(sourcePath);

    if (!exists) throw new CliError(`the draft '${fileName}' does not exist`);

    const filePath = path.join(POMODORO_DRAFTS_FOLDER_PATH, fileName);
    await fs.copyFile(filePath, path.join(destination, fileName));
  }

  return {
    createDraftsFolder,
    getDraftsFiles,
    writeDraft,
    readDraft,
    deleteDraft,
    copyDraft,
  };
}
