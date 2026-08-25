import {
  createContext,
  use,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { configService, type ConfigData } from "../services/app-configs";
import type { PomodoroConfig } from "../models/countdown";

type ConfigState = ConfigData;

type ConfigContext = {
  configState: ConfigState;
  updateConfig: (newState: ConfigState) => void;
};

export const ConfigContext = createContext<ConfigContext | null>(null);

export function ConfigProvider({
  config,
  children,
}: {
  config: PomodoroConfig;
  children: ReactNode;
}) {
  const configsService = useRef(configService());

  const [configState, useConfigState] = useState(config);

  const updateConfig = useCallback(
    (newState: ConfigState) => {
      useConfigState(newState);
    },
    [configState],
  );

  const value = useMemo(
    () => ({
      configState,
      updateConfig,
    }),
    [configState, updateConfig],
  );

  useEffect(() => {
    configsService.current.updateConfig(configState);
  }, [configState]);

  return <ConfigContext value={value}>{children}</ConfigContext>;
}

export function useConfigs(): ConfigContext {
  const ctx = useContext(ConfigContext);
  if (!ctx) {
    throw new Error("useConfigs must be used within a ConfigProvider");
  }
  return ctx;
}
