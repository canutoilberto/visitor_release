"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Pagination } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { useFormStore } from "@/api/formStore";

const Schedules = () => {
  const { schedules, fetchSchedules } = useFormStore();

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const formatDate = (dateStr) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateStr).toLocaleDateString("pt-BR", options);
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-6 sm:p-10">
      <div className="max-w-[1200px] w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Visitas Agendadas</h1>
          <Button className="bg-blue-600 hover:bg-blue-500" size="sm">
            Nova Visita
          </Button>
        </div>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Data</TableHead>
                <TableHead className="text-center">Horário</TableHead>
                <TableHead className="text-center">Visitante</TableHead>
                <TableHead className="text-center">Motivo</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell className="text-center">
                    {formatDate(schedule.visitDate)}
                  </TableCell>
                  <TableCell className="text-center">
                    {schedule.visitTime}
                  </TableCell>
                  <TableCell className="text-center">
                    {schedule.visitorName}
                  </TableCell>
                  <TableCell className="text-center">
                    {schedule.details}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        className="bg-blue-600 text-white"
                        variant="outline"
                        size="sm"
                      >
                        Editar
                      </Button>
                      <Button
                        className="bg-red-600 text-white"
                        variant="danger"
                        size="sm"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <CardFooter>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Mostrando 1-10 de {schedules.length} visitas
              </div>
              <Pagination />
            </div>
          </CardFooter>
        </Card>
        <div className="mt-6 flex items-center gap-4">
          <Input
            type="date"
            placeholder="Filtrar por data"
            className="w-auto"
          />
          <Input
            type="text"
            placeholder="Filtrar por nome do visitante"
            className="w-auto"
          />
          <Button variant="outline">Filtrar</Button>
        </div>
      </div>
    </div>
  );
};

export default Schedules;
