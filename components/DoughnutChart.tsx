import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

interface DoughnutChartProps {
  income: number;
  expense: number;
  investment: number;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  income,
  expense,
  investment,
}) => {
  const total = income + expense + investment;

  // Define colors used in the chart
  const incomeColor = 'rgb(75, 192, 192)';
  const expenseColor = 'rgb(255, 99, 132)';
  const investmentColor = 'rgb(54, 162, 235)';

  const data = {
    labels: ["Income", "Expense", "Investment"],
    datasets: [
      {
        label: "Transaction Breakdown",
        data: [income, expense, investment],
        backgroundColor: [incomeColor, expenseColor, investmentColor],
        hoverOffset: 4,
        borderRadius: 20,
        spacing: 10,
      },
    ],
  };

  const options = {
    cutout: 112,
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  const incomePercentage = total ? (income / total) * 100 : 0;
  const expensePercentage = total ? (expense / total) * 100 : 0;
  const investmentPercentage = total ? (investment / total) * 100 : 0;

  return (
    <div className="relative w-full h-64 flex flex-col items-center">
      <div className="relative">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-center font-bold text-lg">Total</p>
          <p className="text-center font-bold text-xl">${total.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-start">
        <div className="flex items-center">
          <span
            className="w-4 h-4 mr-2 rounded-sm"
            style={{ backgroundColor: incomeColor }}
          ></span>
          <p className="font-semibold">Income: {incomePercentage.toFixed(2)}%</p>
        </div>
        <div className="flex items-center mt-2">
          <span
            className="w-4 h-4 mr-2 rounded-sm"
            style={{ backgroundColor: expenseColor }}
          ></span>
          <p className="font-semibold">Expense: {expensePercentage.toFixed(2)}%</p>
        </div>
        <div className="flex items-center mt-2">
          <span
            className="w-4 h-4 mr-2 rounded-sm"
            style={{ backgroundColor: investmentColor }}
          ></span>
          <p className="font-semibold">Investment: {investmentPercentage.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
