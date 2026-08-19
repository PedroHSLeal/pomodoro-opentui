import { useEffect, useRef, useState } from "react"
import { DraftEditor } from "../components/DraftEditor"
import { DraftExplorer } from "../components/DraftExplorer"
import { NewDraftModal } from "../components/modals/NewDraft"
import { DeleteDraftModal } from "../components/modals/DeleteDraft"
import { useDrafts } from "../context/draftsContext"
import { useDimensionsBreakpoints } from "../hooks/useDimensionsBreakpoints"
import { PALETTE } from "../color"
import { useDebounce } from "../hooks/useDebounce"
import { Show } from "../components/Show"

type ModalState = {
  type: "new" | "delete";
  name?: string;
}

export function DraftsView() {
  const drafts = useDrafts()

  const [editorContent, setEditorContent] = useState("")
  const [modal, setModal] = useState<ModalState | null>(null)

  const editorRef = useRef<any>(null);

  const saveDraft = useDebounce(() => {
    if (drafts.activeFile) {
      drafts.writeDraft(drafts.activeFile, editorRef.current!.content());
    }
  }, 150);

  const handleSelect = async (file: string) => {
    const content = await drafts.readDraft(file)
    await drafts.writeDraft(drafts.activeFile!, editorRef.current!.content());
    setEditorContent(content)
  }

  const handleCreate = async (name: string) => {
    const content = await drafts.writeDraft(name, editorContent)
    setEditorContent(content)
    setModal(null)
  }

  const handleConfirmDelete = async () => {
    if (modal?.type !== "delete") return
    await drafts.deleteDraft(modal.name!)
    setEditorContent("")
    setModal(null)
  }

  const openDelete = () => {
    if (drafts.activeFile) {
      setModal({ type: "delete", name: drafts.activeFile })
    }
  }

  return (
    <box flexDirection="column">
      <text content="Drafts" />
      <box flexDirection="row">
        <box width="70%">
          <DraftEditor ref={editorRef} content={editorContent} onEditorChange={saveDraft} />
        </box>
        <box width="30%">
          <DraftExplorer
            files={drafts.files}
            activeFile={drafts.activeFile}
            onSelect={handleSelect}
            onNew={() => setModal({ type: "new" })}
            onDelete={openDelete}
          />
        </box>
      </box>
      <Show when={modal?.type === "new"}>
        <NewDraftModal
          defaultName={`${Date.now()}.md`}
          onSubmit={handleCreate}
          onCancel={() => setModal(null)}
        />
      </Show>
      <Show when={modal?.type === "delete"}>
        <DeleteDraftModal
          name={modal?.name ?? ""}
          onConfirm={handleConfirmDelete}
          onCancel={() => setModal(null)}
        />
      </Show>
    </box>
  )
}
