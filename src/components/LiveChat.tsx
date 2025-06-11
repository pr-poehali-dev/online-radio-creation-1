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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sampleMessages = [
    {
      user: "Дмитрий Козлов",
      text: "Какая классная песня играет!",
      emoji: "🎵",
    },
    {
      user: "Елена Петрова",
      text: "Привет всем в чате! Как дела?",
      emoji: "👋",
    },
    {
      user: "Александр Смирнов",
      text: "Можно заказать что-то из рока?",
      emoji: "🤘",
    },
    {
      user: "Анна Иванова",
      text: "Эта музыка поднимает настроение!",
      emoji: "💃",
    },
    {
      user: "Петр Соколов",
      text: "Отличное радио, слушаю каждый день",
      emoji: "❤️",
    },
    { user: "Мария Волкова", text: "Есть кто из Москвы в чате?", emoji: "🏙️" },
    { user: "Игорь Морозов", text: "Этот трек просто огонь!", emoji: "🔥" },
    {
      user: "София Кузнецова",
      text: "Спасибо за такую атмосферу!",
      emoji: "🙏",
    },
    {
      user: "Максим Новиков",
      text: "Слушаю уже третий час подряд",
      emoji: "😊",
    },
    {
      user: "Ольга Федорова",
      text: "Познакомимся? Я из Санкт-Петербурга",
      emoji: "😘",
    },
    {
      user: "Артем Лебедев",
      text: "Привет Оля! Тоже люблю хорошую музыку",
      emoji: "😎",
    },
    {
      user: "Татьяна Орлова",
      text: "Какая сейчас песня? Очень нравится!",
      emoji: "🎶",
    },
    {
      user: "Сергей Павлов",
      text: "Идеально для работы подходит",
      emoji: "💻",
    },
    {
      user: "Наталья Белова",
      text: "А танцевальной музыки будет?",
      emoji: "🕺",
    },
    {
      user: "Владимир Зайцев",
      text: "Это радио - настоящая находка!",
      emoji: "✨",
    },
    { user: "Юлия Романова", text: "Отличное качество звука", emoji: "🎧" },
    {
      user: "Андрей Васильев",
      text: "Можно заказать классическую музыку?",
      emoji: "🎻",
    },
    {
      user: "Екатерина Жукова",
      text: "Слушаю во время тренировки",
      emoji: "💪",
    },
    { user: "Никита Медведев", text: "Крутой плейлист сегодня", emoji: "🔥" },
    { user: "Виктория Захарова", text: "Привет из Казани!", emoji: "👋" },
    { user: "Роман Тихонов", text: "Эта песня напоминает юность", emoji: "🌟" },
    {
      user: "Алиса Макарова",
      text: "Спасибо за отличное настроение",
      emoji: "☀️",
    },
    { user: "Константин Попов", text: "Слушаю каждый вечер", emoji: "🌙" },
    {
      user: "Полина Григорьева",
      text: "Какая атмосферная музыка",
      emoji: "💫",
    },
    {
      user: "Денис Степанов",
      text: "Можно больше современных хитов?",
      emoji: "🎤",
    },
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

  // Загружаем сохраненные сообщения при загрузке
  useEffect(() => {
    const savedMessages = localStorage.getItem("radioNoumi_chatMessages");
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      setMessages(parsedMessages);
    }
  }, []);

  // Сохраняем сообщения в localStorage при изменении
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("radioNoumi_chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  // Управляем счетчиком онлайн пользователей
  useEffect(() => {
    // Загружаем сохраненное количество пользователей
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
      // Первый запуск - устанавливаем 10,000
      setOnlineUsers(10000);
      localStorage.setItem("radioNoumi_onlineUsers", "10000");
      localStorage.setItem("radioNoumi_lastUpdate", new Date().toISOString());
    }

    // Обновляем каждый час
    const interval = setInterval(() => {
      setOnlineUsers((prev) => {
        const newCount = prev + Math.floor(Math.random() * 50 + 20);
        localStorage.setItem("radioNoumi_onlineUsers", newCount.toString());
        localStorage.setItem("radioNoumi_lastUpdate", new Date().toISOString());
        return newCount;
      });
    }, 3600000); // 1 час = 3,600,000 мс

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Добавляем случайные сообщения с проверкой на дубликаты
    const interval = setInterval(
      () => {
        const randomMessage =
          sampleMessages[Math.floor(Math.random() * sampleMessages.length)];

        // Проверяем, не было ли такого же сообщения в последних 10
        const recentMessages = messages.slice(-10);
        const isDuplicate = recentMessages.some(
          (msg) =>
            msg.text === randomMessage.text && msg.user === randomMessage.user,
        );

        if (!isDuplicate) {
          const newMsg: Message = {
            id: Date.now() + Math.random(),
            user: randomMessage.user,
            text: randomMessage.text,
            timestamp: new Date(),
            emoji: randomMessage.emoji,
          };
          setMessages((prev) => [...prev, newMsg]);
        }
      },
      3000 + Math.random() * 5000,
    );

    return () => clearInterval(interval);
  }, [messages]);

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
