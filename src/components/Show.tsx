import type { ReactNode } from "react";

type Props = {
  when: boolean;
  children: ReactNode;
};

export function Show({ when, children }: Props) {
  return when ? children : null;
}
