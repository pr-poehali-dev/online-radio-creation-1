import React, { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const ListenerCounter = () => {
  const [listeners, setListeners] = useState(() => {
    const saved = localStorage.getItem("listenerCount");
    return saved ? parseInt(saved) : 1000000;
  });

  useEffect(() => {
    const interval = setInterval(
      () => {
        setListeners((prev) => {
          // Более реалистичные колебания - чаще небольшие изменения
          const rand = Math.random();
          let change;

          if (rand < 0.4) {
            // 40% - небольшой рост (100-5000)
            change = Math.floor(Math.random() * 4900) + 100;
          } else if (rand < 0.7) {
            // 30% - небольшое падение (100-3000)
            change = -(Math.floor(Math.random() * 2900) + 100);
          } else if (rand < 0.85) {
            // 15% - средний рост (5000-20000)
            change = Math.floor(Math.random() * 15000) + 5000;
          } else if (rand < 0.95) {
            // 10% - средняя потеря (3000-15000)
            change = -(Math.floor(Math.random() * 12000) + 3000);
          } else {
            // 5% - большой скачок (20000-50000)
            change = Math.floor(Math.random() * 30000) + 20000;
          }

          const newValue = Math.max(1000000, prev + change);
          localStorage.setItem("listenerCount", newValue.toString());
          return newValue;
        });
      },
      2000 + Math.random() * 3000,
    ); // Интервал 2-5 секунд

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
      <div className="flex items-center justify-center space-x-2 mb-2">
        <Icon name="Users" size={20} className="text-purple-300" />
        <span className="text-purple-200">Сейчас слушают</span>
      </div>
      <div className="text-2xl font-bold text-white">
        {listeners.toLocaleString()}
      </div>
      <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-2 animate-pulse"></div>
    </div>
  );
};

export default ListenerCounter;
