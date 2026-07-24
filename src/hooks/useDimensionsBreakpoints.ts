import { useTerminalDimensions } from "@opentui/react"

export type Breakpoints = {
  isNarrow: boolean
  isMinimalWidth: boolean
  isMinimalHeight: boolean
  isMinimal: boolean
}

export const NARROW_MAX_WIDTH = 100
export const MINIMAL_MAX = 20

export function useDimensionsBreakpoints(): Breakpoints {
  const { width, height } = useTerminalDimensions()

  const isNarrow = width <= NARROW_MAX_WIDTH
  const isMinimalWidth = width <= MINIMAL_MAX
  const isMinimalHeight = height <= MINIMAL_MAX
  const isMinimal = isMinimalWidth || isMinimalHeight

  return { isNarrow, isMinimalWidth, isMinimalHeight, isMinimal }
}
