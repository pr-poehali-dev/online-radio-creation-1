import React from "react";
import TopChart from "@/components/TopChart";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const TopChartPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Навигация */}
      <div className="container mx-auto px-4 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors mb-6"
        >
          <Icon name="ArrowLeft" size={20} />
          Назад к радио
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            🏆 Топ Чарт
          </h1>
          <TopChart />
        </div>
      </div>
    </div>
  );
};

export default TopChartPage;
