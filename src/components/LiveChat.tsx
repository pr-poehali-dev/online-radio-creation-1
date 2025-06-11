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
      user: "МузыкантДима",
      text: "Какая классная песня играет! 🎵",
      emoji: "🎵",
    },
    { user: "ЛенаМелодия", text: "Привет всем в чате! Как дела?", emoji: "👋" },
    { user: "РокФан2024", text: "Можно заказать что-то из рока?", emoji: "🤘" },
    {
      user: "ТанцуюДень",
      text: "Эта музыка так поднимает настроение!",
      emoji: "💃",
    },
    {
      user: "МеломанПетр",
      text: "Отличное радио, слушаю каждый день",
      emoji: "❤️",
    },
    { user: "МузыкаВечер", text: "Есть кто из Москвы в чате?", emoji: "🏙️" },
    { user: "БитИЗвук", text: "Этот трек просто огонь! 🔥", emoji: "🔥" },
    {
      user: "МелодичнаяДуша",
      text: "Спасибо за такую атмосферу!",
      emoji: "🙏",
    },
    {
      user: "РадиоСлушатель",
      text: "Сколько уже слушаю - не надоедает",
      emoji: "😊",
    },
    { user: "ЗвукиСердца", text: "Познакомимся? Я Анна, 25 лет", emoji: "😘" },
    {
      user: "МузыкальныйДруг",
      text: "Привет Анна! Я Максим, тоже люблю музыку",
      emoji: "😎",
    },
    {
      user: "РитмЖизни",
      text: "Какая сейчас песня играет? Очень нравится!",
      emoji: "🎶",
    },
    {
      user: "ВечернийСлушатель",
      text: "Идеально для работы подходит",
      emoji: "💻",
    },
    { user: "ДискоФанат", text: "А танцевальной музыки будет?", emoji: "🕺" },
    { user: "МелодияДуши", text: "Это радио - просто находка!", emoji: "✨" },
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
    // Добавляем случайные сообщения
    const interval = setInterval(
      () => {
        const randomMessage =
          sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
        const newMsg: Message = {
          id: Date.now() + Math.random(),
          user: randomMessage.user,
          text: randomMessage.text,
          timestamp: new Date(),
          emoji: randomMessage.emoji,
        };

        setMessages((prev) => [...prev, newMsg]);
      },
      3000 + Math.random() * 5000,
    );

    return () => clearInterval(interval);
  }, []);

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
