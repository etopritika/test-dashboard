import Chart from "@/components/Chart";
import { fetchChartData } from "@/lib/api";

async function Dashboard() {
  const { monthlyData, totalLossesData, error } = await fetchChartData();

  if (error) {
    return (
      <section className="py-4">
        <h1 className="sr-only">Dashboard Page</h1>
        <div className="flex justify-center items-center h-screen">
          <span className="text-red-500 text-lg">{error}</span>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4">
      <h1 className="sr-only">Dashboard Page</h1>
      <Chart monthlyData={monthlyData!} totalLossesData={totalLossesData!} />
    </section>
  );
}

export default Dashboard;
