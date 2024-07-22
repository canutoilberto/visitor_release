import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const DetailsModal = ({ isOpen, onClose, details }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button variant="outline">Detalhes da Visita</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detalhes da Visita</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <div className="col-span-3">
              <p>{details?.visitorName || "N/A"}</p>
            </div>
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="contact" className="text-right">
              Contato
            </Label>
            <div className="col-span-3">
              <p>{details?.visitorContact || "N/A"}</p>
              <p>{details?.email || "N/A"}</p>
            </div>
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="company" className="text-right">
              Empresa
            </Label>
            <div className="col-span-3">
              <p>{details?.company || "N/A"}</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <div>
            <Button type="button" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
