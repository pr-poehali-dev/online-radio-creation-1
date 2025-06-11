import React from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const TopChartPreview = () => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
      <div className="mb-4">
        <Icon name="TrendingUp" size={48} className="mx-auto text-purple-300" />
      </div>

      <h3 className="text-xl font-semibold text-white mb-3">Топ чарт</h3>

      <p className="text-purple-300 text-sm mb-6">
        Посмотрите самые популярные треки и добавьте свои любимые песни в чарт
      </p>

      <Link
        to="/top-chart"
        className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
      >
        <Icon name="Music" size={20} />
        Открыть чарт
      </Link>
    </div>
  );
};

export default TopChartPreview;
