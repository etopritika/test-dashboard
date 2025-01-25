"use client";
import { useState } from "react";
import { TableData, DayData, Losses } from "@/lib/types";
import { Settings } from "lucide-react";

type TableProps = {
  tableData: TableData; // Массив даних для таблиці
};

export default function Table({ tableData }: TableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState("25.01.2025");
  const [sortColumn, setSortColumn] = useState<keyof Losses>("category");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Отримати дані для вибраної дати
  const selectedDay: DayData | undefined = tableData.find(
    (day) => day.date === selectedDate
  );
  const losses: Losses[] = selectedDay ? selectedDay.losses : [];

  // Пошук і фільтрація
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

  // Функція для сортування
  const handleSort = (column: keyof Losses) => {
    setSortOrder(sortColumn === column && sortOrder === "asc" ? "desc" : "asc");
    setSortColumn(column);
  };

  return (
    <div className="overflow-x-auto">
      {/* Вибір дати */}
      <div className="mb-4">
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select a date</option>
          {tableData.map((day) => (
            <option key={day.date} value={day.date}>
              {day.date}
            </option>
          ))}
        </select>
      </div>

      {/* Пошук і фільтри */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {Array.from(
            new Set(
              tableData.flatMap((day) => day.losses.map((row) => row.category))
            )
          ).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Таблиця */}
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
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : ""} // Додаємо фон для непарних і парних рядків
            >
              <td className="border px-4 py-2">{row.category}</td>
              <td className="border px-4 py-2">{row.count.toLocaleString()}</td>
              <td className="border px-4 py-2 text-center">
                <button className="text-white bg-blue-500 hover:bg-blue-400 p-2 rounded border-none">
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
