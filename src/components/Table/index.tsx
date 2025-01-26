"use client";
import { useState } from "react";
import { TableData, DayData, Losses } from "@/lib/types";
import { Settings } from "lucide-react";
import { useModal } from "@/providers/modal-provider";
import ModalContainer from "../Modals/Modal-Container";
import EditModal from "../Modals/Edit-Modal";
import DateSelector from "../Modals/Date-Selector";
import TableFilters from "./Table-Filters";

type TableProps = {
  initialTableData: TableData;
};

export default function Table({ initialTableData }: TableProps) {
  const { setOpen } = useModal();
  const [tableData, setTableData] = useState<TableData>(initialTableData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState("25.01.2025");
  const [sortColumn, setSortColumn] = useState<keyof Losses>("category");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const selectedDay: DayData | undefined = tableData.find(
    (day) => day.date === selectedDate
  );
  const losses: Losses[] = selectedDay ? selectedDay.losses : [];

  const filteredData = losses
    .filter(
      (row) =>
        row.category.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filter ? row.category === filter : true)
    )
    .sort((a, b) => {
      const isAsc = sortOrder === "asc";
      if (sortColumn === "category") {
        return isAsc
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      } else {
        return isAsc ? a.count - b.count : b.count - a.count;
      }
    });

  const handleSort = (column: keyof Losses) => {
    setSortOrder(sortColumn === column && sortOrder === "asc" ? "desc" : "asc");
    setSortColumn(column);
  };

  const handleOpenModal = (category: string, count: number) => {
    setOpen(
      <ModalContainer>
        <EditModal
          initialCategory={category}
          initialCount={count}
          onEdit={(newCategory, newCount) => {
            setTableData((prevTableData) =>
              prevTableData.map((day) => {
                if (day.date === selectedDate) {
                  return {
                    ...day,
                    losses: day.losses.map((loss) =>
                      loss.category === category
                        ? { ...loss, category: newCategory, count: newCount }
                        : loss
                    ),
                  };
                }
                return day;
              })
            );
          }}
          onDelete={() => {
            setTableData((prevTableData) =>
              prevTableData.map((day) => {
                if (day.date === selectedDate) {
                  return {
                    ...day,
                    losses: day.losses.filter(
                      (loss) => loss.category !== category
                    ),
                  };
                }
                return day;
              })
            );
          }}
        />
      </ModalContainer>
    );
  };

  return (
    <div className="overflow-x-auto">
      <DateSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        availableDates={tableData.map((day) => day.date)}
      />
      <TableFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filter={filter}
        setFilter={setFilter}
        losses={selectedDay?.losses || []}
      />

      <table className="min-w-full border-collapse border border-gray-300 bg-gray-200">
        <thead>
          <tr>
            <th
              onClick={() => handleSort("category")}
              className="border px-4 py-2 cursor-pointer"
            >
              Category{" "}
              {sortColumn === "category"
                ? sortOrder === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th
              onClick={() => handleSort("count")}
              className="border px-4 py-2 cursor-pointer"
            >
              Count{" "}
              {sortColumn === "count" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="border px-4 py-2">{row.category}</td>
              <td className="border px-4 py-2">{row.count.toLocaleString()}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleOpenModal(row.category, row.count)}
                  className="text-white bg-blue-500 hover:bg-blue-400 p-2 rounded border-none"
                >
                  <Settings />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
