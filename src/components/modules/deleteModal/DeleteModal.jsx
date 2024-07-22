"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteModal = ({ isOpen, onClose, onConfirm, scheduleId }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Excluir Registro</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir este registro? Essa ação não poderá
            ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between">
          <Button
            variant="destructive"
            onClick={() => {
              if (scheduleId) {
                onConfirm(scheduleId);
              }
              onClose();
            }}
          >
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
