import React, { useState } from "react";
import Icon from "@/components/ui/icon";

const OrderForms = () => {
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [trackOrder, setTrackOrder] = useState({ track: "", time: "" });
  const [greeting, setGreeting] = useState({
    fromName: "",
    toName: "",
    message: "",
  });
  const [songRequest, setSongRequest] = useState({
    name: "",
    contact: "",
    description: "",
  });

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Заказ трека "${trackOrder.track}" на ${trackOrder.time} отправлен!`);
    setTrackOrder({ track: "", time: "" });
    setActiveForm(null);
  };

  const handleGreetingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Привет от ${greeting.fromName} для ${greeting.toName} отправлен!`);
    setGreeting({ fromName: "", toName: "", message: "" });
    setActiveForm(null);
  };

  const handleSongSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Заказ песни от ${songRequest.name} отправлен!`);
    setSongRequest({ name: "", contact: "", description: "" });
    setActiveForm(null);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-white mb-6 text-center">
        Интерактив 🎤
      </h3>

      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => setActiveForm(activeForm === "track" ? null : "track")}
          className="flex items-center space-x-3 p-5 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20"
        >
          <Icon name="Music" size={24} className="text-purple-300" />
          <span className="text-white font-medium">Заказать трек</span>
        </button>

        <button
          onClick={() =>
            setActiveForm(activeForm === "greeting" ? null : "greeting")
          }
          className="flex items-center space-x-3 p-5 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20"
        >
          <Icon name="Heart" size={24} className="text-purple-300" />
          <span className="text-white font-medium">Передать привет</span>
        </button>

        <button
          onClick={() => setActiveForm(activeForm === "song" ? null : "song")}
          className="flex items-center space-x-3 p-5 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20"
        >
          <Icon name="Mic" size={24} className="text-purple-300" />
          <span className="text-white font-medium">Заказать свою песню</span>
        </button>
      </div>

      {/* Форма заказа трека */}
      {activeForm === "track" && (
        <form
          onSubmit={handleTrackSubmit}
          className="bg-white/10 rounded-xl p-6 space-y-4 border border-white/20"
        >
          <h4 className="text-lg font-medium text-white">Заказать трек</h4>
          <input
            type="text"
            placeholder="Введите название трека"
            value={trackOrder.track}
            onChange={(e) =>
              setTrackOrder((prev) => ({ ...prev, track: e.target.value }))
            }
            className="w-full px-4 py-3 bg-white/20 rounded-lg text-white placeholder-purple-200 border border-white/20 focus:border-purple-400 focus:outline-none"
            required
          />
          <input
            type="time"
            placeholder="Введите время"
            value={trackOrder.time}
            onChange={(e) =>
              setTrackOrder((prev) => ({ ...prev, time: e.target.value }))
            }
            className="w-full px-4 py-3 bg-white/20 rounded-lg text-white placeholder-purple-200 border border-white/20 focus:border-purple-400 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium"
          >
            Отправить заказ
          </button>
        </form>
      )}

      {/* Форма привета */}
      {activeForm === "greeting" && (
        <form
          onSubmit={handleGreetingSubmit}
          className="bg-white/10 rounded-xl p-6 space-y-4 border border-white/20"
        >
          <h4 className="text-lg font-medium text-white">Передать привет</h4>
          <input
            type="text"
            placeholder="Ваше имя"
            value={greeting.fromName}
            onChange={(e) =>
              setGreeting((prev) => ({ ...prev, fromName: e.target.value }))
            }
            className="w-full px-4 py-3 bg-white/20 rounded-lg text-white placeholder-purple-200 border border-white/20 focus:border-purple-400 focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Имя кому хотите передать привет"
            value={greeting.toName}
            onChange={(e) =>
              setGreeting((prev) => ({ ...prev, toName: e.target.value }))
            }
            className="w-full px-4 py-3 bg-white/20 rounded-lg text-white placeholder-purple-200 border border-white/20 focus:border-purple-400 focus:outline-none"
            required
          />
          <textarea
            placeholder="Текст привета"
            value={greeting.message}
            onChange={(e) =>
              setGreeting((prev) => ({ ...prev, message: e.target.value }))
            }
            className="w-full px-4 py-3 bg-white/20 rounded-lg text-white placeholder-purple-200 border border-white/20 focus:border-purple-400 focus:outline-none h-24 resize-none"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium"
          >
            Отправить привет
          </button>
        </form>
      )}

      {/* Форма заказа песни */}
      {activeForm === "song" && (
        <form
          onSubmit={handleSongSubmit}
          className="bg-white/10 rounded-xl p-6 space-y-4 border border-white/20"
        >
          <h4 className="text-lg font-medium text-white">
            Заказать свою песню
          </h4>
          <input
            type="text"
            placeholder="Ваше имя"
            value={songRequest.name}
            onChange={(e) =>
              setSongRequest((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full px-4 py-3 bg-white/20 rounded-lg text-white placeholder-purple-200 border border-white/20 focus:border-purple-400 focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Как с вами связаться"
            value={songRequest.contact}
            onChange={(e) =>
              setSongRequest((prev) => ({ ...prev, contact: e.target.value }))
            }
            className="w-full px-4 py-3 bg-white/20 rounded-lg text-white placeholder-purple-200 border border-white/20 focus:border-purple-400 focus:outline-none"
            required
          />
          <textarea
            placeholder="Опишите какую песню хотите заказать"
            value={songRequest.description}
            onChange={(e) =>
              setSongRequest((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="w-full px-4 py-3 bg-white/20 rounded-lg text-white placeholder-purple-200 border border-white/20 focus:border-purple-400 focus:outline-none h-32 resize-none"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium"
          >
            Заказать песню
          </button>
        </form>
      )}
    </div>
  );
};

export default OrderForms;
