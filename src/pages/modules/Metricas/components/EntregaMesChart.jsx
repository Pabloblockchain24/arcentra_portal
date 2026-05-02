import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const EntregaMesChart = ({ data }) => {
  return (
    <div className="chart-card">
      <h4>Entregas del Mes</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="dia" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="entregas"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EntregaMesChart;