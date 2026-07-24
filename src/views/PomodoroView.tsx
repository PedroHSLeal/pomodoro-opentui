import { useKeyboard } from "@opentui/react"
import { useDimensionsBreakpoints } from "../hooks/useDimensionsBreakpoints"
import { useCountdown } from "../hooks/useCountdown"
import { Button } from "../components/Button"
import { play } from "../audio"
import { PALETTE } from "../color"
import { useConfigs } from "../context/ConfigContext"

export function PomodoroView() {
  const { configState } = useConfigs();
  const { isNarrow, isMinimal } = useDimensionsBreakpoints()
  const countdown = useCountdown(configState)

  useKeyboard((key) => {
    if (isMinimal) {
      if (key.name === "space") {
        play("click");
        if (countdown.isRunning) countdown.pause();
        else countdown.play();
      }
    }
  })

  return (
    <box flexDirection="column" alignItems="stretch" flexShrink={0}>
      <box justifyContent="center" alignItems="center" focused={isMinimal}>
        <ascii-font text={countdown.formattedTime} font="block" />
      </box>
      {!isMinimal && (
        <box
          flexDirection={isNarrow ? "column" : "row"}
          justifyContent="space-evenly"
          gap={1}
        >
          <Button
            content="Play"
            color={PALETTE.WHITE}
            backgroundColor={PALETTE.GRAY}
            hoverBackground={PALETTE.GREEN}
            flexGrow={1}
            justifyContent="center"
            onMouseDown={() => {
              play("click")
              countdown.play()
            }}
          />
          <Button
            content="Stop"
            color={PALETTE.WHITE}
            backgroundColor={PALETTE.GRAY}
            hoverBackground={PALETTE.RED}
            flexGrow={1}
            justifyContent="center"
            onMouseDown={() => {
              play("click")
              countdown.pause()
            }}
          />
          <Button
            content="Reset"
            color={PALETTE.WHITE}
            backgroundColor={PALETTE.GRAY}
            hoverBackground={PALETTE.BLUE}
            flexGrow={1}
            justifyContent="center"
            onMouseDown={() => {
              play("click")
              countdown.reset()
            }}
          />
        </box>
      )}
    </box>
  )
}
