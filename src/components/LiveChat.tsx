import React, { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

interface Message {
  id: number;
  user: string;
  text: string;
  timestamp: Date;
  emoji?: string;
}

const LiveChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser] = useState(
    `Пользователь${Math.floor(Math.random() * 1000)}`,
  );
  const [onlineUsers, setOnlineUsers] = useState(10000);
  const [usedMessages, setUsedMessages] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversationPairs = [
    { user: "Дмитрий Козлов", text: "Привет всем! Как дела?", emoji: "👋" },
    {
      user: "Анна Иванова",
      text: "Привет Дима! Все отлично, слушаю радио",
      emoji: "🎵",
    },
    {
      user: "Сергей Петров",
      text: "Какая сейчас песня играет? Очень нравится!",
      emoji: "❤️",
    },
    {
      user: "Елена Смирнова",
      text: "Это новый хит! Тоже в восторге",
      emoji: "🔥",
    },
    {
      user: "Александр Волков",
      text: "Кто-нибудь знает исполнителя?",
      emoji: "🤔",
    },
    {
      user: "Ольга Морозова",
      text: "Это группа StarLight! Классные ребята",
      emoji: "⭐",
    },
    {
      user: "Игорь Лебедев",
      text: "Спасибо Оля! Буду искать их альбомы",
      emoji: "🙏",
    },
    {
      user: "Мария Новикова",
      text: "У них есть отличная песня Ocean Dreams",
      emoji: "🌊",
    },
    { user: "Андрей Козлов", text: "Познакомимся? Я из Москвы", emoji: "😊" },
    {
      user: "Татьяна Белова",
      text: "Привет Андрей! Я из СПБ, тоже люблю музыку",
      emoji: "💫",
    },
    {
      user: "Владимир Орлов",
      text: "Можно заказать что-то из рока?",
      emoji: "🤘",
    },
    {
      user: "Наталья Павлова",
      text: "Поддерживаю! Хочется энергичного",
      emoji: "⚡",
    },
    {
      user: "Денис Соколов",
      text: "А мне нравится текущий плейлист",
      emoji: "👍",
    },
    {
      user: "Юлия Федорова",
      text: "Согласна с Денисом, отличная подборка",
      emoji: "💎",
    },
    {
      user: "Максим Захаров",
      text: "Слушаю уже третий час подряд",
      emoji: "⏰",
    },
    {
      user: "София Тихонова",
      text: "Максим, а что больше всего понравилось?",
      emoji: "🎶",
    },
    {
      user: "Роман Степанов",
      text: "Это радио - настоящая находка!",
      emoji: "✨",
    },
    {
      user: "Екатерина Попова",
      text: "Полностью согласна! Качество супер",
      emoji: "🎧",
    },
    {
      user: "Никита Медведев",
      text: "Есть кто из Казани в чате?",
      emoji: "🏙️",
    },
    { user: "Алиса Макарова", text: "Я из Казани! Привет земляк", emoji: "👋" },
    {
      user: "Константин Григорьев",
      text: "Какая атмосферная музыка сегодня",
      emoji: "🌟",
    },
    { user: "Полина Васильева", text: "Да, очень расслабляющая", emoji: "😌" },
    {
      user: "Артем Жуков",
      text: "А можно больше танцевальной музыки?",
      emoji: "💃",
    },
    {
      user: "Виктория Романова",
      text: "Артем, тоже хочется потанцевать!",
      emoji: "🕺",
    },
    {
      user: "Павел Зайцев",
      text: "Слушаю во время работы, очень помогает",
      emoji: "💻",
    },
    { user: "Светлана Медведева", text: "Пав, а что за работа?", emoji: "🤓" },
    {
      user: "Михаил Орлов",
      text: "Этот трек напоминает мне юность",
      emoji: "🌈",
    },
    { user: "Дарья Кузнецова", text: "Миша, а сколько тебе лет?", emoji: "😄" },
    {
      user: "Олег Титов",
      text: "Можно заказать классическую музыку?",
      emoji: "🎻",
    },
    {
      user: "Ирина Никитина",
      text: "Олег, поддерживаю! Бах или Моцарт",
      emoji: "🎼",
    },
  ];

  const singleMessages = [
    { user: "Вадим Серов", text: "Отличное качество звука", emoji: "🔊" },
    { user: "Кристина Белкина", text: "Слушаю каждый день!", emoji: "📅" },
    { user: "Глеб Морозов", text: "Это лучшее радио!", emoji: "🏆" },
    { user: "Лариса Королева", text: "Спасибо за такую музыку", emoji: "💝" },
    { user: "Тимур Алексеев", text: "Настроение на высоте", emoji: "☀️" },
    { user: "Вера Сидорова", text: "Музыка для души", emoji: "💖" },
    {
      user: "Руслан Иванов",
      text: "Класс! Продолжайте в том же духе",
      emoji: "👏",
    },
    { user: "Камилла Петрова", text: "Идеально для вечера", emoji: "🌙" },
    { user: "Борис Козин", text: "Хит за хитом!", emoji: "🎯" },
    { user: "Злата Волкова", text: "Обожаю это радио", emoji: "😍" },
  ];

  const emojis = [
    "😊",
    "🎵",
    "❤️",
    "🔥",
    "👋",
    "🎶",
    "💃",
    "🤘",
    "✨",
    "🙏",
    "😎",
    "💻",
    "🕺",
    "😘",
  ];

  useEffect(() => {
    const savedMessages = localStorage.getItem("radioNoumi_chatMessages");
    const savedUsedMessages = localStorage.getItem("radioNoumi_usedMessages");

    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      setMessages(parsedMessages);
    }

    if (savedUsedMessages) {
      setUsedMessages(new Set(JSON.parse(savedUsedMessages)));
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("radioNoumi_chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(
      "radioNoumi_usedMessages",
      JSON.stringify([...usedMessages]),
    );
  }, [usedMessages]);

  useEffect(() => {
    const savedUsers = localStorage.getItem("radioNoumi_onlineUsers");
    const savedTimestamp = localStorage.getItem("radioNoumi_lastUpdate");

    if (savedUsers && savedTimestamp) {
      const lastUpdate = new Date(savedTimestamp);
      const now = new Date();
      const hoursPassed = Math.floor(
        (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60),
      );

      if (hoursPassed > 0) {
        const newUserCount =
          parseInt(savedUsers) +
          hoursPassed * Math.floor(Math.random() * 50 + 20);
        setOnlineUsers(newUserCount);
        localStorage.setItem("radioNoumi_onlineUsers", newUserCount.toString());
        localStorage.setItem("radioNoumi_lastUpdate", now.toISOString());
      } else {
        setOnlineUsers(parseInt(savedUsers));
      }
    } else {
      setOnlineUsers(10000);
      localStorage.setItem("radioNoumi_onlineUsers", "10000");
      localStorage.setItem("radioNoumi_lastUpdate", new Date().toISOString());
    }

    const interval = setInterval(() => {
      setOnlineUsers((prev) => {
        const newCount = prev + Math.floor(Math.random() * 50 + 20);
        localStorage.setItem("radioNoumi_onlineUsers", newCount.toString());
        localStorage.setItem("radioNoumi_lastUpdate", new Date().toISOString());
        return newCount;
      });
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => {
        const allMessages = [...conversationPairs, ...singleMessages];
        const availableMessages = allMessages.filter(
          (msg) => !usedMessages.has(`${msg.user}:${msg.text}`),
        );

        if (availableMessages.length === 0) {
          // Если все сообщения использованы, очищаем историю
          setUsedMessages(new Set());
          return;
        }

        const randomMessage =
          availableMessages[
            Math.floor(Math.random() * availableMessages.length)
          ];
        const messageKey = `${randomMessage.user}:${randomMessage.text}`;

        const newMsg: Message = {
          id: Date.now() + Math.random(),
          user: randomMessage.user,
          text: randomMessage.text,
          timestamp: new Date(),
          emoji: randomMessage.emoji,
        };

        setMessages((prev) => [...prev, newMsg]);
        setUsedMessages((prev) => new Set([...prev, messageKey]));
      },
      3000 + Math.random() * 5000,
    );

    return () => clearInterval(interval);
  }, [usedMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const msg: Message = {
        id: Date.now(),
        user: currentUser,
        text: newMessage,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, msg]);
      setNewMessage("");
    }
  };

  const addEmoji = (emoji: string) => {
    setNewMessage((prev) => prev + emoji);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 h-96 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="MessageCircle" size={20} className="text-purple-300" />
          <h3 className="text-lg font-semibold text-white">Живой чат</h3>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div className="flex items-center space-x-2 text-green-400">
          <Icon name="Users" size={16} />
          <span className="text-sm font-medium">
            {onlineUsers.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 mb-3">
        {messages.map((message) => (
          <div key={message.id} className="text-sm">
            <span className="text-purple-300 font-medium">{message.user}:</span>
            <span className="text-white ml-2">{message.text}</span>
            {message.emoji && <span className="ml-1">{message.emoji}</span>}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex space-x-2 mb-2">
        {emojis.slice(0, 8).map((emoji) => (
          <button
            key={emoji}
            onClick={() => addEmoji(emoji)}
            className="text-lg hover:scale-110 transition-transform"
          >
            {emoji}
          </button>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Напишите сообщение..."
          className="flex-1 px-3 py-2 bg-white/20 rounded-lg text-white placeholder-purple-200 border border-white/20 focus:border-purple-400 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          <Icon name="Send" size={16} />
        </button>
      </div>
    </div>
  );
};

export default LiveChat;
