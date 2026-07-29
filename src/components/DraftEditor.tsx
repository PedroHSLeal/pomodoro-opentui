import { useEffect,useImperativeHandle,useRef, useState, type RefObject } from "react"
import type { ScrollBoxRenderable, TextareaRenderable } from "@opentui/core"
import { PALETTE } from "../color"

export type DraftEditorProps = {
  content: string
  onEditorChange: (...args: any[]) => void
  ref: RefObject<any>
}

export function DraftEditor({ content, ref, onEditorChange }: DraftEditorProps) {
  const scrollBoxRef = useRef<ScrollBoxRenderable>(null)
  const textAreaRef = useRef<TextareaRenderable>(null)

  useImperativeHandle(ref, () => {
    return {
      content: () => textAreaRef.current!.plainText
    }
  }, [ref]);

  const [cursorRow, setCursorRow] = useState(0);
  const [cursorCol, setCursorCol] = useState(0);

  useEffect(() => {
    textAreaRef.current!.setText(content);
    textAreaRef.current!.focus();

    setCursorRow(0);
    setCursorCol(0);
  }, [content]);

  function updateCursorInfos() {
    setCursorRow(textAreaRef.current?.logicalCursor.row ?? 0);
    setCursorCol(textAreaRef.current?.logicalCursor.col ?? 0);
  }

  return (
    <box flexDirection="column" height="100%">
      <scrollbox
        ref={scrollBoxRef}
        flexDirection="row"
        scrollX
        scrollY
        onMouseScroll={(e) => { e.preventDefault(); e.stopPropagation(); }}
      >
        <textarea
          ref={textAreaRef}
          wrapMode="none"
          onKeyDown={(e) => { e.stopPropagation(); updateCursorInfos(); onEditorChange(); }}
          onMouseScroll={(e) => { e.preventDefault(); e.stopPropagation(); updateCursorInfos(); }}
        />
      </scrollbox>
      <box backgroundColor={PALETTE.GRAY}>
        <box flexDirection="row" justifyContent="flex-end">
          <text>cursor: </text>
          <text>({cursorRow}, {cursorCol})</text>
        </box>
      </box>
    </box>
  )
}
