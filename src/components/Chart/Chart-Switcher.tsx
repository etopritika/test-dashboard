function ChartSwitcher({
  activeChart,
  onSwitch,
}: {
  activeChart: "monthly" | "total";
  onSwitch: (chart: "monthly" | "total") => void;
}) {
  return (
    <div className="flex justify-center space-x-4 mb-4">
      <button
        onClick={() => onSwitch("monthly")}
        className={`p-2 ${
          activeChart === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200"
        } rounded`}
      >
        By months
      </button>
      <button
        onClick={() => onSwitch("total")}
        className={`p-2 ${
          activeChart === "total" ? "bg-blue-500 text-white" : "bg-gray-200"
        } rounded`}
      >
        Growing total
      </button>
    </div>
  );
}
export default ChartSwitcher;
