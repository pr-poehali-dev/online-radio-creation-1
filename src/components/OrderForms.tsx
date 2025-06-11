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

  const whatsappNumber = "79049808275";

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `🎵 *Заказ трека с радиостанции*

*Трек:* ${trackOrder.track}
*Желаемое время:* ${trackOrder.time}

_Заказ поступил: ${new Date().toLocaleString("ru-RU")}_`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    setTrackOrder({ track: "", time: "" });
    setActiveForm(null);
  };

  const handleGreetingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `💌 *Новый привет с радиостанции*

*От:* ${greeting.fromName}
*Для:* ${greeting.toName}
*Сообщение:* ${greeting.message}

_Отправлено: ${new Date().toLocaleString("ru-RU")}_`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    setGreeting({ fromName: "", toName: "", message: "" });
    setActiveForm(null);
  };

  const handleSongSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `🎤 *Заказ собственной песни*

*Имя:* ${songRequest.name}
*Контакт:* ${songRequest.contact}
*Описание песни:* ${songRequest.description}

_Заказ поступил: ${new Date().toLocaleString("ru-RU")}_`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    setSongRequest({ name: "", contact: "", description: "" });
    setActiveForm(null);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">Интерактив 🎤</h3>

      {/* Кнопки форм */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setActiveForm(activeForm === "track" ? null : "track")}
          className="flex items-center space-x-2 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        >
          <Icon name="Music" size={20} className="text-purple-300" />
          <span className="text-white">Заказать трек</span>
        </button>

        <button
          onClick={() =>
            setActiveForm(activeForm === "greeting" ? null : "greeting")
          }
          className="flex items-center space-x-2 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        >
          <Icon name="Heart" size={20} className="text-purple-300" />
          <span className="text-white">Передать привет</span>
        </button>

        <button
          onClick={() => setActiveForm(activeForm === "song" ? null : "song")}
          className="flex items-center space-x-2 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        >
          <Icon name="Mic" size={20} className="text-purple-300" />
          <span className="text-white">Заказать песню</span>
        </button>
      </div>

      {/* Форма заказа трека */}
      {activeForm === "track" && (
        <form
          onSubmit={handleTrackSubmit}
          className="bg-white/10 rounded-lg p-4 space-y-4"
        >
          <h4 className="text-lg font-medium text-white">Заказать трек</h4>
          <input
            type="text"
            placeholder="Название трека или исполнитель"
            value={trackOrder.track}
            onChange={(e) =>
              setTrackOrder((prev) => ({ ...prev, track: e.target.value }))
            }
            className="w-full px-3 py-2 bg-white/20 rounded-lg text-white placeholder-purple-200 border border-white/20 focus:border-purple-400 focus:outline-none"
            required
          />
          <input
            type="time"
            placeholder="Желаемое время"
            value={trackOrder.time}
            onChange={(e) =>
              setTrackOrder((prev) => ({ ...prev, time: e.target.value }))
            }
            className="w-full px-3 py-2 bg-white/20 rounded-lg text-white placeholder-purple-200 border border-white/20 focus:border-purple-400 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Отправить в WhatsApp
          </button>
        </form>
      )}

      {/* Форма привета */}
      {activeForm === "greeting" && (
        <form
          onSubmit={handleGreetingSubmit}
          className="bg-white/10 rounded-lg p-4 space-y-4"
        >
          <h4 className="text-lg font-medium text-white">Передать привет</h4>
          <input
            type="text"
            placeholder="Ваше имя"
            value={greeting.fromName}
            onChange={(e) =>
              setGreeting((prev) => ({ ...prev, fromName: e.target.value }))
            }
            className="w-full px-3 py-2 bg-white/20 rounded-lg text-white placeholder-purple-200 border border-white/20 focus:border-purple-400 focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Имя получателя"
            value={greeting.toName}
            onChange={(e) =>
              setGreeting((prev) => ({ ...prev, toName: e.target.value }))
            }
            className="w-full px-3 py-2 bg-white/20 rounded-lg text-white placeholder-purple-200 border border-white/20 focus:border-purple-400 focus:outline-none"
            required
          />
          <textarea
            placeholder="Текст привета"
            value={greeting.message}
            onChange={(e) =>
              setGreeting((prev) => ({ ...prev, message: e.target.value }))
            }
            className="w-full px-3 py-2 bg-white/20 rounded-lg text-white placeholder-purple-200 border border-white/20 focus:border-purple-400 focus:outline-none h-20 resize-none"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Отправить в WhatsApp
          </button>
        </form>
      )}

      {/* Форма заказа песни */}
      {activeForm === "song" && (
        <form
          onSubmit={handleSongSubmit}
          className="bg-white/10 rounded-lg p-4 space-y-4"
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
            className="w-full px-3 py-2 bg-white/20 rounded-lg text-white placeholder-purple-200 border border-white/20 focus:border-purple-400 focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Как с вами связаться (телефон/email)"
            value={songRequest.contact}
            onChange={(e) =>
              setSongRequest((prev) => ({ ...prev, contact: e.target.value }))
            }
            className="w-full px-3 py-2 bg-white/20 rounded-lg text-white placeholder-purple-200 border border-white/20 focus:border-purple-400 focus:outline-none"
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
            className="w-full px-3 py-2 bg-white/20 rounded-lg text-white placeholder-purple-200 border border-white/20 focus:border-purple-400 focus:outline-none h-24 resize-none"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Отправить в WhatsApp
          </button>
        </form>
      )}
    </div>
  );
};

export default OrderForms;
