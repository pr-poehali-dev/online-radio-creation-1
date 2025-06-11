import React from "react";
import Icon from "@/components/ui/icon";
import TopChart from "@/components/TopChart";

const TopChartPreview = () => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <div className="mb-4 text-center">
        <Icon
          name="TrendingUp"
          size={48}
          className="mx-auto text-purple-300 mb-3"
        />
        <h3 className="text-xl font-semibold text-white mb-3">Топ чарт</h3>
        <p className="text-purple-300 text-sm mb-4">
          Посмотрите самые популярные треки и добавьте свои любимые песни в чарт
        </p>
      </div>

      <TopChart />
    </div>
  );
};

export default TopChartPreview;
