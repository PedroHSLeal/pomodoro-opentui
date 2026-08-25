import type { ReactNode } from "react";
import { PALETTE } from "../color";

export type ModalProps = {
  children: ReactNode;
};

export function Modal({ children }: ModalProps) {
  return (
    <box
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      backgroundColor={PALETTE.BLACK}
      justifyContent="center"
      alignItems="center"
    >
      <box
        width="30%"
        height="auto"
        padding={1}
        paddingX={3}
        backgroundColor={PALETTE.GRAY}
      >
        {children}
      </box>
    </box>
  );
}
