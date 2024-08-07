"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { useFormStore } from "@/api/formStore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "@/components/modules/privateRoute/PrivateRoute";
import Topbar from "@/components/modules/topbar/Topbar";

const VisitorForm = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
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
    user,
  } = useFormStore((state) => ({
    email: state.email,
    visitorName: state.visitorName,
    visitorContact: state.visitorContact,
    visitDate: state.visitDate,
    visitTime: state.visitTime,
    company: state.company,
    employeeName: state.employeeName,
    hostContact: state.hostContact,
    details: state.details,
    setFormData: state.setFormData,
    submitForm: state.submitForm,
    user: state.user,
  }));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

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

    if (!user) {
      toast.error("Você precisa estar logado para enviar o formulário.");
      return;
    }

    setIsSubmitting(true);

    try {
      await submitForm();
      setFormData("email", "");
      setFormData("visitorName", "");
      setFormData("visitorContact", "");
      setFormData("visitDate", "");
      setFormData("visitTime", "");
      setFormData("company", "");
      setFormData("employeeName", "");
      setFormData("hostContact", "");
      setFormData("details", "");
      toast("Agendamento realizado!");
    } catch (error) {
      console.error("Erro ao agendar a visita: ", error);
      toast.error("Erro ao agendar a visita.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigateToSchedules = () => {
    router.push("/agendamentos");
  };

  if (!isMounted) {
    return null; // Ou um indicador de carregamento
  }

  return (
    <PrivateRoute>
      <Topbar />
      <div className="relative max-w-2xl mx-auto p-4">
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
                  onChange={(e) =>
                    setFormData("visitorContact", e.target.value)
                  }
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
                      <SelectItem value="TV Cabo Branco">
                        Tv Cabo Branco
                      </SelectItem>
                      <SelectItem value="TV Paraíba">Tv Paraíba</SelectItem>
                      <SelectItem value="CBN">Rede Litorânea - CBN</SelectItem>
                      <SelectItem value="Cabo Branco FM">
                        Cabo Branco FM
                      </SelectItem>
                      <SelectItem value="Jornal da Paraíba">
                        Jornal da Paraíba
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.company && (
                  <div className="text-red-600">{errors.company}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeName">
                  Responsável pela visita{" "}
                  <span className="text-red-600">*</span>
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
                <Label htmlFor="details">Detalhes adicionais</Label>
                <Textarea
                  id="details"
                  value={details}
                  onChange={(e) => setFormData("details", e.target.value)}
                  placeholder="Sua resposta"
                />
              </div>
              <CardFooter className="w-full flex flex-col gap-4 mt-6 sm:flex-row sm:gap-4">
                <Button
                  type="button"
                  className="w-full font-semibold bg-cyan-600 hover:bg-cyan-500 text-white"
                  onClick={handleNavigateToSchedules}
                  disabled={isSubmitting}
                >
                  VER AGENDAMENTOS
                </Button>
                <Button
                  type="submit"
                  className="w-full font-semibold bg-blue-600 hover:bg-blue-500 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "ENVIANDO..." : "ENVIAR"}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
        <ToastContainer autoClose={2000} type="success" />
      </div>
    </PrivateRoute>
  );
};

export default VisitorForm;
