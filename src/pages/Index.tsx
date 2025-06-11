import React from "react";
import RadioPlayer from "@/components/RadioPlayer";
import ListenerCounter from "@/components/ListenerCounter";
import LikeSystem from "@/components/LikeSystem";
import LiveChat from "@/components/LiveChat";
import OrderForms from "@/components/OrderForms";
import TopChart from "@/components/TopChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок и плеер */}
        <div className="text-center mb-8">
          <RadioPlayer />
          <LikeSystem />
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка - Счётчик слушателей */}
          <div className="space-y-6">
            <ListenerCounter />

            {/* Дополнительная информация */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-3">
                О радиостанции
              </h3>
              <p className="text-purple-200 text-sm">
                Лучшая музыка 24/7. Слушайте хиты, открывайте новые треки и
                общайтесь с музыкальным сообществом.
              </p>
              <div className="flex items-center space-x-4 mt-4 text-sm text-purple-300">
                <span>🎵 Прямой эфир</span>
                <span>🌍 Worldwide</span>
                <span>💫 HD Quality</span>
              </div>
            </div>
          </div>

          {/* Центральная колонка - Чат */}
          <div>
            <LiveChat />
          </div>

          {/* Правая колонка - Формы заказов */}
          <div>
            <OrderForms />
          </div>
        </div>

        {/* Топ чарт */}
        <div className="space-y-6">
          <TopChart />
        </div>

        {/* Подвал */}
        <div className="text-center mt-12 text-purple-300">
          <p className="text-sm">
            © 2024 Онлайн Радио | Создано с ❤️ для любителей музыки
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
