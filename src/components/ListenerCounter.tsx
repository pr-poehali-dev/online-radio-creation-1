import React, { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const ListenerCounter = () => {
  const [listeners, setListeners] = useState(() => {
    const saved = localStorage.getItem("listenerCount");
    return saved ? parseInt(saved) : 100000;
  });

  useEffect(() => {
    const interval = setInterval(
      () => {
        setListeners((prev) => {
          const rand = Math.random();
          let change;

          if (rand < 0.4) {
            change = Math.floor(Math.random() * 4900) + 100;
          } else if (rand < 0.7) {
            change = -(Math.floor(Math.random() * 2900) + 100);
          } else if (rand < 0.85) {
            change = Math.floor(Math.random() * 15000) + 5000;
          } else if (rand < 0.95) {
            change = -(Math.floor(Math.random() * 12000) + 3000);
          } else {
            change = Math.floor(Math.random() * 30000) + 20000;
          }

          const newValue = Math.max(100000, prev + change);
          localStorage.setItem("listenerCount", newValue.toString());
          return newValue;
        });
      },
      2000 + Math.random() * 3000,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
      <div className="flex items-center justify-center space-x-2 mb-3">
        <Icon name="Users" size={24} className="text-purple-300" />
        <span className="text-purple-200 font-medium">Сейчас слушают</span>
      </div>
      <div className="text-3xl font-bold text-white mb-2">
        {listeners.toLocaleString()}
      </div>
      <div className="flex items-center justify-center space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm text-gray-300">
          В режиме реального времени
        </span>
      </div>
    </div>
  );
};

export default ListenerCounter;
