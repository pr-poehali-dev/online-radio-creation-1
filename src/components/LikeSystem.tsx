import React, { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const LikeSystem = () => {
  const [likes, setLikes] = useState(150000);
  const [dislikes, setDislikes] = useState(100);
  const [userLiked, setUserLiked] = useState<boolean | null>(null);

  useEffect(() => {
    // Лайки каждый час +1-2
    const likeInterval = setInterval(() => {
      setLikes((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 3600000);

    // Дизлайки каждые 10 часов +1
    const dislikeInterval = setInterval(() => {
      setDislikes((prev) => prev + 1);
    }, 36000000);

    // Для демонстрации - ускоренные интервалы
    const demoLikeInterval = setInterval(() => {
      setLikes((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 10000);

    const demoDislikeInterval = setInterval(() => {
      setDislikes((prev) => prev + 1);
    }, 100000);

    return () => {
      clearInterval(likeInterval);
      clearInterval(dislikeInterval);
      clearInterval(demoLikeInterval);
      clearInterval(demoDislikeInterval);
    };
  }, []);

  const handleLike = () => {
    if (userLiked === true) {
      setUserLiked(null);
      setLikes((prev) => prev - 1);
    } else {
      if (userLiked === false) {
        setDislikes((prev) => prev - 1);
      }
      setUserLiked(true);
      setLikes((prev) => prev + 1);
    }
  };

  const handleDislike = () => {
    if (userLiked === false) {
      setUserLiked(null);
      setDislikes((prev) => prev - 1);
    } else {
      if (userLiked === true) {
        setLikes((prev) => prev - 1);
      }
      setUserLiked(false);
      setDislikes((prev) => prev + 1);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-8 mt-6">
      <button
        onClick={handleLike}
        className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 ${
          userLiked === true
            ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
            : "bg-white/10 text-purple-200 hover:bg-white/20 hover:scale-105"
        }`}
      >
        <Icon name="ThumbsUp" size={20} />
        <span className="font-semibold text-lg">{likes.toLocaleString()}</span>
      </button>

      <button
        onClick={handleDislike}
        className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 ${
          userLiked === false
            ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
            : "bg-white/10 text-purple-200 hover:bg-white/20 hover:scale-105"
        }`}
      >
        <Icon name="ThumbsDown" size={20} />
        <span className="font-semibold text-lg">
          {dislikes.toLocaleString()}
        </span>
      </button>
    </div>
  );
};

export default LikeSystem;
