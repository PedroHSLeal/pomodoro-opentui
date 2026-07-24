import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, type ReactNode } from "react"
import { draftService } from "../services/drafts"

type DraftsState = {
  files: string[]
  activeFile: string | undefined
  error: Error | null
}

type DraftsAction =
  | { type: "SET_FILES"; files: string[] }
  | { type: "ADD_FILE"; file: string }
  | { type: "REMOVE_FILE"; file: string }
  | { type: "SET_ACTIVE"; file: string | undefined }
  | { type: "SET_ERROR"; error: Error | null }

function reducer(state: DraftsState, action: DraftsAction): DraftsState {
  switch (action.type) {
    case "SET_FILES": return { ...state, files: action.files }
    case "ADD_FILE": return state.files.includes(action.file) ? state : { ...state, files: [...state.files, action.file] }
    case "REMOVE_FILE": return {
      ...state,
      files: state.files.filter((f) => f !== action.file),
      activeFile:
        state.activeFile === action.file ? undefined : state.activeFile,
    }
    case "SET_ACTIVE": return { ...state, activeFile: action.file }
    case "SET_ERROR": return { ...state, error: action.error }
    default: return state
  }
}

type DraftsContext = {
  files: string[]
  activeFile: string | undefined
  writeDraft: (fileName: string, content: string) => Promise<string>
  deleteDraft: (fileName: string) => Promise<void>
  readDraft: (fileName: string) => Promise<string>
}

const DraftsContext = createContext<DraftsContext | null>(null)

export function DraftsProvider({ children }: { children: ReactNode }) {
  const draftsService = draftService();

  const [state, dispatch] = useReducer(reducer, {
    files: [],
    activeFile: undefined,
    error: null,
  })

  const handleError = useCallback((err: unknown) => {
    dispatch({
      type: "SET_ERROR",
      error: err instanceof Error ? err : new Error(String(err)),
    })
  }, [])

  const loadFiles = useCallback(async () => {
    try {
      const files = await draftsService.getDraftsFiles()
      dispatch({ type: "SET_FILES", files })
    } catch (err) {
      handleError(err)
    }
  }, [handleError])

  const writeDraft = useCallback(
    async (fileName: string, content: string) => {
      try {
        await draftsService.writeDraft(fileName, content)
        dispatch({ type: "ADD_FILE", file: fileName })
        dispatch({ type: "SET_ACTIVE", file: fileName })
        return ""
      } catch (err) {
        handleError(err)
        return ""
      }
    }, [handleError, state.files])

  const deleteDraft = useCallback(
    async (fileName: string) => {
      try {
        await draftsService.deleteDraft(fileName)
        dispatch({ type: "REMOVE_FILE", file: fileName })
      } catch (err) {
        handleError(err)
      }
    },
    [handleError],
  )

  const readDraft = useCallback(
    async (fileName: string) => {
      try {
        dispatch({ type: "SET_ACTIVE", file: fileName })
        return await draftsService.readDraft(fileName)
      } catch (err) {
        handleError(err)
        return ""
      }
    },
    [handleError],
  )

  useEffect(() => {
    loadFiles()
  }, [loadFiles])

  const value = useMemo<DraftsContext>(
    () => ({
      files: state.files,
      activeFile: state.activeFile,
      error: state.error,
      writeDraft,
      deleteDraft,
      readDraft,
    }),
    [
      state.files,
      state.activeFile,
      state.error,
      writeDraft,
      deleteDraft,
      readDraft,
    ],
  )

  return (
    <DraftsContext value={value}>{children}</DraftsContext>
  )
}

export function useDrafts(): DraftsContext {
  const ctx = useContext(DraftsContext)
  if (!ctx) {
    throw new Error("useDrafts must be used within a DraftsProvider")
  }
  return ctx
}
