"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import DeleteModal from "@/components/modules/deleteModal/DeleteModal";

const Schedules = () => {
  const { schedules, fetchSchedules, deleteSchedule } = useFormStore();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);

  // Estados dos filtros
  const [dateFilter, setDateFilter] = useState("");
  const [visitorNameFilter, setVisitorNameFilter] = useState("");

  const [filteredSchedules, setFilteredSchedules] = useState([]);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  useEffect(() => {
    // Aplicar os filtros
    const filterSchedules = () => {
      let result = [...schedules];

      if (dateFilter) {
        result = result.filter((schedule) => schedule.visitDate === dateFilter);
      }

      if (visitorNameFilter) {
        result = result.filter((schedule) =>
          schedule.visitorName
            .toLowerCase()
            .includes(visitorNameFilter.toLowerCase())
        );
      }

      setFilteredSchedules(result);
    };

    filterSchedules();
  }, [schedules, dateFilter, visitorNameFilter]);

  const formatDate = (dateStr) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateStr).toLocaleDateString("pt-BR", options);
  };

  const handleNewVisitClick = () => {
    router.push("/");
  };

  const handleDelete = async (scheduleId) => {
    try {
      await deleteSchedule(scheduleId);
      fetchSchedules(); // Atualize a lista de agendamentos após a exclusão
    } catch (error) {
      console.error("Erro ao excluir o agendamento: ", error);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-6 sm:p-10">
      <div className="max-w-[1200px] w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Visitas Agendadas</h1>
          <Button
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-500"
            onClick={handleNewVisitClick}
          >
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
                <TableHead className="text-center">Contato</TableHead>
                <TableHead className="text-center">Motivo</TableHead>
                <TableHead className="text-center ">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedules.map((schedule) => (
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
                    {schedule.visitorContact}
                  </TableCell>
                  <TableCell className="text-center">
                    {schedule.details}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        className="bg-red-600 text-white hover:bg-red-500"
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          setSelectedScheduleId(schedule.id);
                          setIsModalOpen(true);
                        }}
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
                Mostrando 1-{filteredSchedules.length} de{" "}
                {filteredSchedules.length} visitas
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
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Filtrar por nome do visitante"
            className="w-auto"
            value={visitorNameFilter}
            onChange={(e) => setVisitorNameFilter(e.target.value)}
          />
          <Button variant="outline" onClick={() => fetchSchedules()}>
            Filtrar
          </Button>
        </div>
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        scheduleId={selectedScheduleId}
      />
    </div>
  );
};

export default Schedules;
