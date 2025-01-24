"use client";
import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import ChartSwitcher from "./Chart-Switcher";
import { ProcessedData } from "@/lib/types";

type ChartProps = {
  monthlyData: ProcessedData;
  totalLossesData: ProcessedData;
};

function Chart({ monthlyData, totalLossesData }: ChartProps) {
  const [activeChart, setActiveChart] = useState<"monthly" | "total">(
    "monthly"
  );

  const data = activeChart === "monthly" ? monthlyData : totalLossesData;

  return (
    <div>
      <ChartSwitcher activeChart={activeChart} onSwitch={setActiveChart} />

      <div className="text-center myt-4">
        <h3 className="text-lg font-semibold text-white">
          {activeChart === "monthly"
            ? "Enemy losses by month"
            : "Cumulative enemy losses"}
        </h3>
      </div>

      <div className="w-full flex justify-center">
        <AreaChart
          width={800}
          height={400}
          data={activeChart === "monthly" ? data : totalLossesData}
          margin={{ left: 20, right: 20, top: 20, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            height={60}
            dataKey="month"
            interval={0}
            angle={-90}
            textAnchor="end"
            dx={-8}
          />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </div>
    </div>
  );
}

export default Chart;
