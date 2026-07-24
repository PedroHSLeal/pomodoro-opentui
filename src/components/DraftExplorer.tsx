import { useState } from "react"
import { RGBA } from "@opentui/core"
import { Button } from "./Button"
import { PALETTE } from "../color"

export type DraftExplorerProps = {
  files: string[]
  activeFile: string | undefined
  onSelect: (file: string) => void
  onNew: () => void
  onDelete: () => void
  isMinimal: boolean
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
  const [hovered, setHovered] = useState(false)

  const bg = active || hovered ? ACTIVE_COLOR : "transparent"
  const fg = active ? PALETTE.BLACK : PALETTE.WHITE

  return (
    <text
      id={name}
      content={` ${name} `}
      bg={bg}
      fg={fg}
      onMouseDown={onSelect}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    />
  )
}

export function DraftExplorer({
  files,
  activeFile,
  onSelect,
  onNew,
  onDelete,
  isMinimal,
}: DraftExplorerProps) {
  const newLabel = isMinimal ? "[+]" : "[NEW DRAFT]"
  const deleteLabel = isMinimal ? "[X]" : "[DELETE DRAFT]"

  return (
    <box>
      <box flexDirection="row" justifyContent="space-between">
        <text flexGrow={1} content="Drafts" />
        <box flexDirection="row" justifyContent="flex-end" gap={1}>
          <Button content={newLabel} onMouseDown={onNew} />
          <Button content={deleteLabel} onMouseDown={onDelete} />
        </box>
      </box>
      <scrollbox scrollY>
        <box paddingLeft={1} flexDirection="column">
          {files.map((name) => (
            <FileItem
              key={name}
              name={name}
              active={name === activeFile}
              onSelect={() => onSelect(name)}
            />
          ))}
        </box>
      </scrollbox>
    </box>
  )
}
