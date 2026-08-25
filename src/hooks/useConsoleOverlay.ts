import { useKeyboard, useRenderer } from "@opentui/react";

export function useConsoleOverlay() {
  const renderer = useRenderer();

  useKeyboard((key) => {
    if (key.meta && key.name === "i") {
      renderer.console.toggle();
    }
  });
}
