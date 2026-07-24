import { useState } from "react"
import type { ColorInput, JustifyString } from "@opentui/core"
import { PALETTE } from "../color"

export type ButtonProps = {
  content: string
  onMouseDown?: () => void
  color?: ColorInput
  backgroundColor?: ColorInput
  hoverColor?: ColorInput
  hoverBackground?: ColorInput
  flexGrow?: number
  justifyContent?: JustifyString
}

export function Button({
  content,
  onMouseDown,
  color = PALETTE.WHITE,
  backgroundColor = PALETTE.GRAY,
  hoverColor,
  hoverBackground,
  flexGrow,
  justifyContent,
}: ButtonProps) {
  const [hovered, setHovered] = useState(false)

  const showHover = hovered && hoverBackground !== undefined
  const bg = showHover ? hoverBackground! : backgroundColor
  const fg = hovered && hoverColor ? hoverColor : color

  return (
    <box
      flexShrink={0}
      flexGrow={flexGrow}
      flexDirection="row"
      justifyContent={justifyContent}
      backgroundColor={bg}
      onMouseDown={onMouseDown}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <text fg={fg} content={content} />
    </box>
  )
}
