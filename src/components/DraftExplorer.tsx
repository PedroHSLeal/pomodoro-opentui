import { useState } from "react"
import { RGBA } from "@opentui/core"
import { Button } from "./Button"
import { PALETTE } from "../color"
import { useDimensionsBreakpoints } from "../hooks/useDimensionsBreakpoints"
import { useTerminalDimensions } from "@opentui/react"

export type DraftExplorerProps = {
  files: string[]
  activeFile: string | undefined
  onSelect: (file: string) => void
  onNew: () => void
  onDelete: () => void
}

const ACTIVE_COLOR = RGBA.fromHex("#D6DB23")

function FileItem({
  name,
  active,
  onSelect,
}: {
  name: string
  active: boolean
  onSelect: () => void
}) {
  const [hovered, setHovered] = useState(false);
  const { width } = useTerminalDimensions();

  const bg = active || hovered ? ACTIVE_COLOR : "transparent"
  const fg = active ? PALETTE.BLACK : PALETTE.WHITE

  const onMouseOver = () => {
    setHovered(true);
  };
  const onMouseOut = () => {
    setHovered(false);
  };

  return (
    <text
      id={name}
      content={name}
      bg={bg}
      fg={fg}
      wrapMode="none"
      onMouseDown={onSelect}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    />
  )
}

export function DraftExplorer({
  files,
  activeFile,
  onSelect,
  onNew,
  onDelete,
}: DraftExplorerProps) {
  const { sm } = useDimensionsBreakpoints({ sm: { w: 120 } })
  const newLabel = sm ? " NEW " : " NEW DRAFT "
  const deleteLabel = sm ? " DEL " : " DELETE DRAFT "

  return (
    <box gap={1}>
      <box flexDirection="row" justifyContent="flex-start">
        <Button content={newLabel} hoverBackground={PALETTE.BLUE} onMouseDown={onNew} />
        <Button content={deleteLabel} hoverBackground={PALETTE.RED} onMouseDown={onDelete} />
      </box>
      <scrollbox scrollX scrollY>
        {files.map((name) => (
          <FileItem
            key={name}
            name={name}
            active={name === activeFile}
            onSelect={() => onSelect(name)}
          />
        ))}
      </scrollbox>
    </box>
  )
}
