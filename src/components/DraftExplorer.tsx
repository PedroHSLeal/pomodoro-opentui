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
  const newLabel = sm ? "[+]" : "[NEW DRAFT]"
  const deleteLabel = sm ? "[X]" : "[DELETE DRAFT]"

  return (
    <box>
      <box flexDirection="row" justifyContent="space-between">
        <text flexGrow={1} content="Drafts" />
        <box flexDirection="row" justifyContent="flex-end" gap={1}>
          <Button content={newLabel} onMouseDown={onNew} />
          <Button content={deleteLabel} onMouseDown={onDelete} />
        </box>
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
