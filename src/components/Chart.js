import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { reduceData } from "../utils";

export default function Chart({ features }) {
  const data = reduceData(features);
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="NotClosed" fill="#0080ff" minPointSize={5} />
        <Bar dataKey="Closed" fill="#ff0080" minPointSize={10} />
      </BarChart>
    </ResponsiveContainer>
  );
}
