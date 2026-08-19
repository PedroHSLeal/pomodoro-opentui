import { useKeyboard } from "@opentui/react"
import { useDimensionsBreakpoints } from "../hooks/useDimensionsBreakpoints"
import { useCountdown } from "../hooks/useCountdown"
import { Button } from "../components/Button"
import { play } from "../audio"
import { PALETTE } from "../color"
import { useConfigs } from "../context/configContext"
import { Show } from "../components/Show"

export function PomodoroView() {
  const { configState } = useConfigs();
  const { sm } = useDimensionsBreakpoints({ sm: { h: 15 } });
  const countdown = useCountdown(configState)

  useKeyboard((key) => {
    if (sm) {
      if (key.name === "space") {
        play("click");
        if (countdown.isRunning) countdown.pause();
        else countdown.play();
      }
    }
  })

  return (
    <box borderStyle="rounded" flexShrink={0} paddingX={1}>
      <box backgroundColor={PALETTE.DARK_GRAY} padding={1} flexDirection="column" alignItems="stretch" flexShrink={0} gap={1}>
        <box justifyContent="center" alignItems="center" focused={sm}>
          <ascii-font text={countdown.formattedTime} font="block" />
        </box>
        <Show when={!sm}>
          <box
            flexDirection="row"
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
        </Show>
      </box>
    </box>
  )
}
