"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const DetailsModal = ({ isOpen, onClose, details }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-describedby="details-dialog-description"
      >
        <DialogHeader>
          <DialogTitle>Detalhes da Visita</DialogTitle>
        </DialogHeader>
        <div id="details-dialog-description" className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              Visitante:
            </Label>
            <div className="col-span-3">
              <p>{details?.visitorName || "N/A"}</p>
            </div>
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="contact" className="text-right">
              Contato:
            </Label>
            <div className="col-span-3">
              <p>{details?.visitorContact || "N/A"}</p>
            </div>
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="company" className="text-right">
              Empresa:
            </Label>
            <div className="col-span-3">
              <p>{details?.company || "N/A"}</p>
            </div>
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="employeeName" className="text-right">
              Responsável:
            </Label>
            <div className="col-span-3">
              <p>{details?.employeeName || "N/A"}</p>
            </div>
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="reason" className="text-right">
              Motivo:
            </Label>
            <div className="col-span-3">
              <p>{details?.details || "N/A"}</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
