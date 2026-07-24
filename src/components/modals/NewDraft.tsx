import { useState } from "react"
import { Modal } from "../Modal"
import { Button } from "../Button"
import { PALETTE } from "../../color"

export type NewDraftModalProps = {
  defaultName: string
  onSubmit: (name: string) => void
  onCancel: () => void
}

export function NewDraftModal({ defaultName, onSubmit, onCancel }: NewDraftModalProps) {
  const [name, setName] = useState("")

  const handleSubmit = () => {
    const trimmed = name.trim()
    onSubmit(trimmed.length > 0 ? trimmed : defaultName)
  }

  return (
    <Modal>
      <text content="New Draft" />
      <input
        placeholder={defaultName}
        onInput={setName}
        onSubmit={handleSubmit}
        focused
        textColor={PALETTE.WHITE}
      />
      <box flexDirection="row" gap={2} justifyContent="flex-end">
        <Button content="Cancel" onMouseDown={onCancel} />
        <Button content="Submit" onMouseDown={handleSubmit} />
      </box>
    </Modal>
  )
}
