import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const VisitorForm = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader className="border-b-2 border-red-500 pb-4 w-[90%] mx-auto">
          <CardTitle className="text-3xl font-semibold ">
            Liberação na Portaria
          </CardTitle>
          <CardDescription>
            Olá! Para melhor controle de acesso às nossas empresas será
            necessário o preenchimento desse formulário.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-red-600 pt-4">
            * Indica uma pergunta obrigatória
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">
              E-mail <span className="text-red-600">*</span>
            </Label>
            <Input id="email" placeholder="Seu e-mail" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="visitor-name">
              Nome completo do visitante <span className="text-red-600">*</span>
            </Label>
            <Input id="visitor-name" placeholder="Sua resposta" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="visitor-contact">
              Contato do visitante <span className="text-red-600">*</span>
            </Label>
            <Input id="visitor-contact" placeholder="Sua resposta" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="visit-date">
              Data da visita <span className="text-red-600">*</span>
            </Label>
            <Input id="visit-date" placeholder="Sua resposta" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="visit-time">
              Hora da visita <span className="text-red-600">*</span>
            </Label>
            <Input id="visit-time" placeholder="Sua resposta" type="time" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">
              Empresa a ser visitada <span className="text-red-600">*</span>
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Escolha" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="tvcb">Tv Cabo Branco</SelectItem>
                  <SelectItem value="tvpb">Tv Paraíba</SelectItem>
                  <SelectItem value="CBN">Rede Litorânea - CBN</SelectItem>
                  <SelectItem value="cbfm">Cabo Branco FM</SelectItem>
                  <SelectItem value="jornal-pb">Jornal da Paraíba</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">
              Responsável pela visita <span className="text-red-600">*</span>
            </Label>
            <Input id="department" placeholder="Sua resposta" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="host-name">
              Ramal do responsável pela visita{" "}
              <span className="text-red-600">*</span>
            </Label>
            <Input id="host-name" placeholder="Sua resposta" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="host-contact">
              Observação <span className="text-red-600">*</span>
            </Label>
            <Textarea id="details" placeholder="Sua resposta" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-blue-600 hover:bg-blue-500">
            Enviar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VisitorForm;
