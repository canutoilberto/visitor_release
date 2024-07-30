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
import DetailsModal from "@/components/modules/detailsModal/DetailsModal";
import PrivateRoute from "@/components/modules/privateRoute/PrivateRoute";
import Topbar from "@/components/modules/topbar/Topbar";

const Schedules = () => {
  const { schedules, fetchSchedules, deleteSchedule } = useFormStore();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [selectedScheduleDetails, setSelectedScheduleDetails] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Estados para filtros
  const [visitorNameFilter, setVisitorNameFilter] = useState("");
  const [employeeNameFilter, setEmployeeNameFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");

  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetchSchedules();

    return () => {
      setIsMounted(false);
    };
  }, [fetchSchedules]);

  useEffect(() => {
    if (!isMounted) return;

    const filterSchedules = () => {
      let result = [...schedules];

      if (visitorNameFilter) {
        result = result.filter((schedule) =>
          schedule.visitorName
            .toLowerCase()
            .includes(visitorNameFilter.toLowerCase())
        );
      }

      if (employeeNameFilter) {
        result = result.filter((schedule) =>
          schedule.employeeName
            .toLowerCase()
            .includes(employeeNameFilter.toLowerCase())
        );
      }

      if (startDateFilter && endDateFilter) {
        result = result.filter((schedule) => {
          const visitDate = new Date(schedule.visitDate);
          return (
            visitDate >= new Date(startDateFilter) &&
            visitDate <= new Date(endDateFilter)
          );
        });
      }

      setFilteredSchedules(result);
    };

    filterSchedules();
  }, [
    schedules,
    visitorNameFilter,
    employeeNameFilter,
    startDateFilter,
    endDateFilter,
    isMounted,
  ]);

  const handleNewVisitClick = () => {
    router.push("/agendar-visitante");
  };

  const handleDelete = async () => {
    try {
      if (selectedScheduleId) {
        await deleteSchedule(selectedScheduleId);
        await fetchSchedules(); // Atualize a lista de agendamentos após a exclusão
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Erro ao excluir o agendamento: ", error);
    }
  };

  const handleDetailsClick = (schedule) => {
    setSelectedScheduleDetails(schedule);
    setIsDetailsModalOpen(true);
  };

  return (
    <PrivateRoute>
      <Topbar />
      <div className="flex justify-center items-start min-h-screen p-6 sm:p-10">
        <div className="max-w-[1200px] w-full">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Visitas Agendadas</h1>
            <Button
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-500"
              onClick={handleNewVisitClick}
            >
              Agendar Visita
            </Button>
          </div>
          <Card>
            <div className="hidden sm:block">
              {filteredSchedules.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">Data</TableHead>
                      <TableHead className="text-center">Horário</TableHead>
                      <TableHead className="text-center">Visitante</TableHead>
                      <TableHead className="text-center">Contato</TableHead>
                      <TableHead className="text-center">Responsável</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSchedules.map((schedule) => (
                      <TableRow key={schedule.id}>
                        <TableCell className="text-center">
                          {schedule.visitDate}
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
                          {schedule.employeeName}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              className="bg-blue-600 text-white hover:bg-blue-500"
                              size="sm"
                              onClick={() => handleDetailsClick(schedule)}
                            >
                              Detalhes
                            </Button>
                            <Button
                              className="bg-red-600 text-white hover:bg-red-500"
                              variant="danger"
                              size="sm"
                              onClick={() => {
                                setSelectedScheduleId(schedule.id);
                                setIsModalOpen(true);
                              }}
                            >
                              Excluir
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  Você não possui nenhuma visita agendada...
                </div>
              )}
            </div>
            <div className="block sm:hidden">
              {filteredSchedules.length > 0 ? (
                <div className="space-y-4">
                  {filteredSchedules.map((schedule) => (
                    <Card key={schedule.id} className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">Data:</p>
                          <p>{schedule.visitDate}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Horário:</p>
                          <p>{schedule.visitTime}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="font-semibold">Visitante:</p>
                        <p>{schedule.visitorName}</p>
                      </div>
                      <div className="mt-2">
                        <p className="font-semibold">Contato:</p>
                        <p>{schedule.visitorContact}</p>
                      </div>
                      <div className="mt-2">
                        <p className="font-semibold">Responsável:</p>
                        <p>{schedule.employeeName}</p>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button
                          className="bg-blue-600 text-white hover:bg-blue-500"
                          size="sm"
                          onClick={() => handleDetailsClick(schedule)}
                        >
                          Detalhes
                        </Button>
                        <Button
                          className="bg-red-600 text-white hover:bg-red-500"
                          size="sm"
                          onClick={() => {
                            setSelectedScheduleId(schedule.id);
                            setIsModalOpen(true);
                          }}
                        >
                          Excluir
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  Você não possui nenhuma visita agendada...
                </div>
              )}
            </div>
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
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              placeholder="Filtrar por visitante"
              className="w-full sm:w-auto"
              value={visitorNameFilter}
              onChange={(e) => setVisitorNameFilter(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Filtrar por responsável"
              className="w-full sm:w-auto"
              value={employeeNameFilter}
              onChange={(e) => setEmployeeNameFilter(e.target.value)}
            />
            <Input
              type="date"
              placeholder="Data inicial"
              className="w-full sm:w-auto"
              value={startDateFilter}
              onChange={(e) => setStartDateFilter(e.target.value)}
            />
            <Input
              type="date"
              placeholder="Data final"
              className="w-full sm:w-auto"
              value={endDateFilter}
              onChange={(e) => setEndDateFilter(e.target.value)}
            />
            <Button
              className="bg-cyan-600 text-white hover:bg-cyan-500"
              onClick={() => fetchSchedules()}
            >
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
        <DetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          details={selectedScheduleDetails}
        />
      </div>
    </PrivateRoute>
  );
};

export default Schedules;
