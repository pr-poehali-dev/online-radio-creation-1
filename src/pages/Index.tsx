import React from "react";
import RadioPlayer from "@/components/RadioPlayer";
import ListenerCounter from "@/components/ListenerCounter";
import LikeSystem from "@/components/LikeSystem";
import LiveChat from "@/components/LiveChat";
import OrderForms from "@/components/OrderForms";
import TopChart from "@/components/TopChart";
import NewReleases from "@/components/NewReleases";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 no-scroll-jump">
      {/* Фиксированный плеер */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <RadioPlayer />
          <LikeSystem />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка - Счётчик слушателей */}
          <div className="space-y-6">
            <ListenerCounter />

            {/* Дополнительная информация */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                О радиостанции
              </h3>
              <p className="text-gray-600 text-sm">
                Лучшая музыка 24/7. Слушайте хиты, открывайте новые треки и
                общайтесь с музыкальным сообществом.
              </p>
              <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
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

        {/* Новинки песен */}
        <div className="mt-8">
          <NewReleases />
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
