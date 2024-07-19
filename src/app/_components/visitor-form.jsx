"use client";
import { useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { useFormStore } from "@/api/formStore";

const VisitorForm = () => {
  const { toast } = useToast();

  const {
    email,
    visitorName,
    visitorContact,
    visitDate,
    visitTime,
    company,
    employeeName,
    hostContact,
    details,
    setFormData,
    submitForm,
  } = useFormStore();

  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para desabilitar o botão
  const [errors, setErrors] = useState({}); // Estado para mensagens de erro

  // Configuração dos campos obrigatórios
  const requiredFields = {
    email: "E-mail",
    visitorName: "Nome completo do visitante",
    visitorContact: "Contato do visitante",
    visitDate: "Data da visita",
    visitTime: "Hora da visita",
    company: "Empresa a ser visitada",
    employeeName: "Responsável pela visita",
    hostContact: "Ramal do responsável pela visita",
  };

  // Função para validar campos obrigatórios
  const validateForm = () => {
    const newErrors = {};

    Object.keys(requiredFields).forEach((field) => {
      if (!eval(field)) {
        newErrors[field] = `${requiredFields[field]} é obrigatório.`;
      }
    });

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true); // Desabilita o botão

    try {
      await submitForm();
      toast({
        title: "Agendamento feito com sucesso",
        description: "Aguardamos sua visita. Sejam bem-vindos!",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description:
          "Ocorreu um erro ao agendar a visita. Por favor, tente novamente.",
        status: "error",
      });
    } finally {
      setIsSubmitting(false); // Habilita o botão novamente
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader className="border-b-2 border-red-500 pb-4 mx-auto">
          <CardTitle className="text-3xl font-semibold">
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
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">
                E-mail <span className="text-red-600">*</span>
              </Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setFormData("email", e.target.value)}
                placeholder="Seu e-mail"
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <div className="text-red-600">{errors.email}</div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="visitor-name">
                Nome completo do visitante{" "}
                <span className="text-red-600">*</span>
              </Label>
              <Input
                id="visitor-name"
                value={visitorName}
                onChange={(e) => setFormData("visitorName", e.target.value)}
                placeholder="Sua resposta"
                aria-invalid={errors.visitorName ? "true" : "false"}
              />
              {errors.visitorName && (
                <div className="text-red-600">{errors.visitorName}</div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="visitor-contact">
                Contato do visitante <span className="text-red-600">*</span>
              </Label>
              <Input
                id="visitor-contact"
                value={visitorContact}
                onChange={(e) => setFormData("visitorContact", e.target.value)}
                placeholder="Sua resposta"
                aria-invalid={errors.visitorContact ? "true" : "false"}
              />
              {errors.visitorContact && (
                <div className="text-red-600">{errors.visitorContact}</div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="visit-date">
                Data da visita <span className="text-red-600">*</span>
              </Label>
              <Input
                id="visit-date"
                value={visitDate}
                onChange={(e) => setFormData("visitDate", e.target.value)}
                placeholder="Sua resposta"
                type="date"
                aria-invalid={errors.visitDate ? "true" : "false"}
              />
              {errors.visitDate && (
                <div className="text-red-600">{errors.visitDate}</div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="visit-time">
                Hora da visita <span className="text-red-600">*</span>
              </Label>
              <Input
                id="visit-time"
                value={visitTime}
                onChange={(e) => setFormData("visitTime", e.target.value)}
                placeholder="Sua resposta"
                type="time"
                aria-invalid={errors.visitTime ? "true" : "false"}
              />
              {errors.visitTime && (
                <div className="text-red-600">{errors.visitTime}</div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">
                Empresa a ser visitada <span className="text-red-600">*</span>
              </Label>
              <Select
                value={company}
                onValueChange={(value) => setFormData("company", value)}
                aria-invalid={errors.company ? "true" : "false"}
              >
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
              {errors.company && (
                <div className="text-red-600">{errors.company}</div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="employeeName">
                Responsável pela visita <span className="text-red-600">*</span>
              </Label>
              <Input
                id="employeeName"
                value={employeeName}
                onChange={(e) => setFormData("employeeName", e.target.value)}
                placeholder="Sua resposta"
                aria-invalid={errors.employeeName ? "true" : "false"}
              />
              {errors.employeeName && (
                <div className="text-red-600">{errors.employeeName}</div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="host-contact">
                Ramal do responsável pela visita{" "}
                <span className="text-red-600">*</span>
              </Label>
              <Input
                id="host-contact"
                value={hostContact}
                onChange={(e) => setFormData("hostContact", e.target.value)}
                placeholder="Sua resposta"
                aria-invalid={errors.hostContact ? "true" : "false"}
              />
              {errors.hostContact && (
                <div className="text-red-600">{errors.hostContact}</div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="details">
                Observação <span className="text-red-600">*</span>
              </Label>
              <Textarea
                id="details"
                value={details}
                onChange={(e) => setFormData("details", e.target.value)}
                placeholder="Sua resposta"
                aria-invalid={errors.details ? "true" : "false"}
              />
              {errors.details && (
                <div className="text-red-600">{errors.details}</div>
              )}
            </div>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 mt-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitorForm;
