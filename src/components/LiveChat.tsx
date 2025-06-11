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

        setMessages((prev) => [...prev.slice(-20), newMsg]); // Храним только последние 20 сообщений
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
      <div className="flex items-center space-x-2 mb-3">
        <Icon name="MessageCircle" size={20} className="text-purple-300" />
        <h3 className="text-lg font-semibold text-white">Живой чат</h3>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
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
