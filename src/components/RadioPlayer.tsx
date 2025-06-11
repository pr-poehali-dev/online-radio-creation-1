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
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-white mb-2">Radio Noumi</h1>
        <p className="text-purple-200">
          Слушайте любимую музыку в прямом эфире
        </p>
      </div>

      <div
        className={`relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 cursor-pointer transition-all duration-300 hover:scale-105 ${
          isPlaying ? "animate-pulse shadow-lg shadow-purple-500/50" : ""
        }`}
        onClick={togglePlay}
      >
        {isLoading ? (
          <div className="animate-spin">
            <Icon name="Loader2" size={32} className="text-white" />
          </div>
        ) : (
          <Icon
            name={isPlaying ? "Pause" : "Play"}
            size={32}
            className="text-white ml-1"
          />
        )}
      </div>

      <audio ref={audioRef} src="https://myradio24.org/61673" preload="none" />

      <p className="text-sm text-purple-300">
        {isPlaying ? "🎵 В эфире" : "▶️ Нажмите для воспроизведения"}
      </p>
    </div>
  );
};

export default RadioPlayer;
