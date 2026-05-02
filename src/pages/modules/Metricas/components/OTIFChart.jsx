import React from "react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const OTIFChart = ({ data }) => {
  return (
    <div className="chart-card">
      <h4>Tendencia OTIF</h4>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="mes" stroke="#64748b" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="otif"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OTIFChart;