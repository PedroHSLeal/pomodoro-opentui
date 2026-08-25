import { Modal } from "../Modal";
import { Button } from "../Button";

export type DeleteDraftModalProps = {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function DeleteDraftModal({
  name,
  onConfirm,
  onCancel,
}: DeleteDraftModalProps) {
  return (
    <Modal>
      <text content="Delete Draft" />
      <text content={`Are you sure you want to delete '${name}'?`} />
      <box flexDirection="row" gap={2} justifyContent="flex-end">
        <Button content="Cancel" onMouseDown={onCancel} />
        <Button content="Confirm" onMouseDown={onConfirm} />
      </box>
    </Modal>
  );
}
