import { DraftsProvider } from "./context/draftsContext";
import { ConfigProvider } from "./context/configContext";
import { useDimensionsBreakpoints } from "./hooks/useDimensionsBreakpoints";
import { useConsoleOverlay } from "./hooks/useConsoleOverlay";
import { PomodoroView } from "./views/PomodoroView";
import { DraftsView } from "./views/DraftsView";
import { PALETTE } from "./color";
import { Suspense } from "react";
import { Show } from "./components/Show";
import type { PomodoroConfig } from "./models/countdown";

type Props = {
  config: PomodoroConfig;
  title: string | undefined;
  showOnly: string | undefined;
};

export function App({ config, title, showOnly }: Props) {
  const { sm } = useDimensionsBreakpoints({ sm: { h: 20 } });

  const showOnlyPomodoro = !showOnly || showOnly == "pomodoro";
  const showOnlyDrafts = !showOnly || showOnly == "drafts";

  useConsoleOverlay();

  return (
    <Suspense>
      <ConfigProvider config={config}>
        <DraftsProvider>
          <box
            backgroundColor={PALETTE.BLACK}
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="stretch"
            padding={1}
          >
            <Show when={!sm}>
              <box justifyContent="center" alignItems="center" flexShrink={0}>
                <ascii-font text={title ?? "Pomodoro"} font="tiny" />
              </box>
            </Show>

            <Show when={showOnlyPomodoro}>
              <PomodoroView />
            </Show>

            <Show when={showOnlyDrafts && !sm}>
              <DraftsView />
            </Show>
          </box>
        </DraftsProvider>
      </ConfigProvider>
    </Suspense>
  );
}
