import React, { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      setIsLoading(true);

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Ошибка воспроизведения:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      setIsPlaying(false);
      setIsLoading(false);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <div className="flex items-center justify-center space-x-6">
      {/* Обложка альбома */}
      <div className="relative">
        <div
          className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center shadow-xl transition-all duration-300 ${
            isPlaying ? "animate-pulse shadow-purple-400/50" : ""
          }`}
        >
          <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Icon name="Music" size={24} className="text-white" />
          </div>
        </div>
        {isPlaying && (
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-blue-400/20 animate-pulse blur-sm"></div>
        )}
      </div>

      {/* Центральная информация */}
      <div className="flex-1 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Radio Онлайн
        </h1>
        <p className="text-gray-300 text-sm mb-2">
          Слушайте лучшую музыку в прямом эфире
        </p>
        <p className="text-xs text-gray-400">
          {isPlaying ? "🎵 В эфире" : "▶️ Нажмите для воспроизведения"}
        </p>
      </div>

      {/* Кнопка воспроизведения */}
      <div className="relative">
        <button
          onClick={togglePlay}
          className={`relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${
            isPlaying ? "animate-pulse shadow-purple-500/50" : ""
          }`}
        >
          {isLoading ? (
            <div className="animate-spin">
              <Icon name="Loader2" size={20} className="text-white" />
            </div>
          ) : (
            <Icon
              name={isPlaying ? "Pause" : "Play"}
              size={20}
              className="text-white ml-0.5"
            />
          )}
        </button>

        {/* Пульсирующие круги при воспроизведении */}
        {isPlaying && (
          <>
            <div className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping"></div>
            <div className="absolute -inset-2 rounded-full bg-pink-500/20 animate-pulse"></div>
          </>
        )}
      </div>

      <audio ref={audioRef} src="https://myradio24.org/61673" preload="none" />
    </div>
  );
};

export default RadioPlayer;
