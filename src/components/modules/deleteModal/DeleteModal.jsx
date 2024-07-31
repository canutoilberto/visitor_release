"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteModal = ({ isOpen, onClose, onConfirm, scheduleId }) => {
  const handleConfirm = () => {
    if (scheduleId) {
      onConfirm(scheduleId);
      onClose(); // Fechar o modal após confirmar
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-describedby="delete-dialog-description"
      >
        <DialogHeader>
          <DialogTitle>Excluir Registro</DialogTitle>
          <DialogDescription id="delete-dialog-description">
            Tem certeza que deseja excluir este registro? Esta ação não poderá
            ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between">
          <Button variant="destructive" onClick={handleConfirm}>
            Excluir
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
