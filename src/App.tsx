import { DraftsProvider } from "./context/draftsContext";
import { ConfigProvider } from "./context/configContext";
import { useDimensionsBreakpoints } from "./hooks/useDimensionsBreakpoints";
import { useConsoleOverlay } from "./hooks/useConsoleOverlay";
import { PomodoroView } from "./views/PomodoroView";
import { DraftsView } from "./views/DraftsView";
import { PALETTE } from "./color";
import { Suspense } from "react";
import { Show } from "./components/Show";

export function App() {
  const { sm } = useDimensionsBreakpoints({ sm: { h: 20 } });

  useConsoleOverlay();

  return (
    <Suspense>
      <ConfigProvider>
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
                <ascii-font text="Pomodoro" font="tiny" />
              </box>
            </Show>

            <PomodoroView />

            <Show when={!sm}>
              <DraftsView />
            </Show>
          </box>
        </DraftsProvider>
      </ConfigProvider>
    </Suspense>
  )
}
