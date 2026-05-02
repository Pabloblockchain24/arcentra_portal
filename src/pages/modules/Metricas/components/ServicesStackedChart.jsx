import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ServicesStackedChart = ({ data }) => {
  return (
    <div className="chart-card">
      <h4>Servicios por Día (Stacked)</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="dia" />
          <Tooltip />
          <Legend />
          <Bar dataKey="FULL" stackId="a" fill="#0f172a" />
          <Bar dataKey="RETAIL" stackId="a" fill="#2563eb" />
          <Bar dataKey="B2B" stackId="a" fill="#16a34a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ServicesStackedChart;