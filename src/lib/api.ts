import { ProcessedData, TableData, YearlyData } from "./types";

export async function fetchChartData(): Promise<{
  monthlyData: ProcessedData | null;
  totalLossesData: ProcessedData | null;
  error: string | null;
}> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || ""}/chartsData.json`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch chart data");
    }

    const rawData: YearlyData[] = await res.json();

    const monthlyData = rawData.flatMap((yearData) =>
      yearData.months.map((monthData) => ({
        month: `${monthData.month}.${yearData.year}`,
        value: monthData.losses,
      }))
    );

    let total = 0;
    const totalLossesData = rawData.flatMap((yearData) =>
      yearData.months.map((monthData) => {
        total += monthData.losses;
        return {
          month: `${monthData.month}.${yearData.year}`,
          value: total,
        };
      })
    );

    return { monthlyData, totalLossesData, error: null };
  } catch {
    return {
      monthlyData: null,
      totalLossesData: null,
      error: "Failed to retrieve chart data",
    };
  }
}

export async function fetchTableData(): Promise<{
  tableData: TableData | null;
  error: string | null;
}> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || ""}/tableData.json`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch table data");
    }

    const tableData: TableData = await res.json();
    return { tableData, error: null };
  } catch {
    return { tableData: null, error: "Failed to retrieve table data" };
  }
}
