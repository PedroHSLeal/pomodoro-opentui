import { useEffect, useImperativeHandle, useRef, useState, type RefObject } from "react"
import { LineNumberRenderable, type ScrollBoxRenderable, type TextareaRenderable } from "@opentui/core"
import { PALETTE } from "../color"

export type DraftEditorProps = {
  content: string
  onEditorChange: (...args: any[]) => void
  ref: RefObject<any>
}

export function DraftEditor({ content, ref, onEditorChange }: DraftEditorProps) {
  const scrollBoxRef = useRef<ScrollBoxRenderable>(null);
  const textAreaRef = useRef<TextareaRenderable>(null);

  useImperativeHandle(ref, () => {
    return {
      content: () => textAreaRef.current!.plainText
    }
  }, [ref]);

  useEffect(() => {
    if (content) {
      textAreaRef.current!.setText(content);
      textAreaRef.current!.focus();
    }
  }, [content]);

  return (
    <box paddingX={1} flexDirection="column" height="100%">
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
          onKeyDown={(e) => { onEditorChange(); }}
          onMouseScroll={(e) => { e.stopPropagation(); }}
        />
      </scrollbox>
    </box>
  )
}
