import { useKeyboard, useRenderer } from "@opentui/react"
import { DraftsProvider } from "./context/draftsContext"
import { ConfigProvider } from "./context/ConfigContext"
import { useDimensionsBreakpoints } from "./hooks/useDimensionsBreakpoints"
import { useConsoleOverlay } from "./hooks/useConsoleOverlay"
import { PomodoroView } from "./views/PomodoroView"
import { DraftsView } from "./views/DraftsView"
import { PALETTE } from "./color"
import { Suspense } from "react"

export function App() {
  const { isMinimal } = useDimensionsBreakpoints()

  useConsoleOverlay()

  return (
    <Suspense>
      <ConfigProvider>
        <DraftsProvider>
          <box
            backgroundColor={PALETTE.BLACK}
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="stretch"
            gap={1}
            padding={1}
          >
            {!isMinimal && (
              <box justifyContent="center" alignItems="center" flexShrink={0}>
                <ascii-font text="Pomodoro" font="tiny" />
              </box>
            )}
            <PomodoroView />
            {!isMinimal && <DraftsView />}
          </box>
        </DraftsProvider>
      </ConfigProvider>
    </Suspense>
  )
}
