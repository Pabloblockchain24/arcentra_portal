import React from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const ServicesChart = ({ data }) => {
  return (
    <div className="chart-card">
      <h4>Servicios por Categoría</h4>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="categoria" stroke="#64748b" />
          <Tooltip />
          <Bar dataKey="cantidad" fill="#0f172a" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ServicesChart;