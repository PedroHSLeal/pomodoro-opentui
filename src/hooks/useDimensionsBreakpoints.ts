import { useTerminalDimensions } from "@opentui/react"
import { useMemo } from "react";

type Size = { w?: number, h?: number };

export function useDimensionsBreakpoints<T extends string>(sizes: Record<T, Size>) {
  const { width, height } = useTerminalDimensions();

  console.log(width)
  console.log(height)

  return useMemo(() => {
    const out = {} as Record<T, boolean>;

    for (const bp of Object.keys(sizes) as T[]) {
      let w = (sizes[bp].w ?? 0) <= width;
      let h = (sizes[bp].h ?? 0) <= height;

      out[bp] = !(w && h);
    }

    return out;
  }, [sizes, width, height]);
}
