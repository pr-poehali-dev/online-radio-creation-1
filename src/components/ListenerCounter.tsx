import React, { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const ListenerCounter = () => {
  const [listeners, setListeners] = useState(100000000);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setListeners((prev) => {
          const change =
            Math.random() > 0.5
              ? Math.floor(Math.random() * 50000) + 1000
              : Math.random() > 0.3
                ? -Math.floor(Math.random() * 30000)
                : 0;
          return Math.max(1000000, prev + change);
        });
      },
      3000 + Math.random() * 2000,
    );

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
