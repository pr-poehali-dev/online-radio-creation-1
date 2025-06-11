import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

interface Song {
  id: number;
  title: string;
  cover: string;
  audioFile: string;
}

const NewReleases = () => {
  const [songs, setSongs] = useState<Song[]>([
    {
      id: 1,
      title: "Summer Vibes",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop",
      audioFile: "",
    },
    {
      id: 2,
      title: "Night Dreams",
      cover:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop",
      audioFile: "",
    },
  ]);

  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newSong, setNewSong] = useState({
    title: "",
    cover: null as File | null,
    audioFile: null as File | null,
  });

  const handlePlay = (songId: number) => {
    if (currentPlaying === songId) {
      setCurrentPlaying(null);
    } else {
      setCurrentPlaying(songId);
    }
  };

  const handleFileChange = (type: "cover" | "audioFile", file: File | null) => {
    setNewSong((prev) => ({ ...prev, [type]: file }));
  };

  const handleAddSong = () => {
    if (newSong.title && newSong.cover) {
      const coverUrl = URL.createObjectURL(newSong.cover);
      const audioUrl = newSong.audioFile
        ? URL.createObjectURL(newSong.audioFile)
        : "";

      const song: Song = {
        id: songs.length + 1,
        title: newSong.title,
        cover: coverUrl,
        audioFile: audioUrl,
      };

      setSongs((prev) => [song, ...prev]);
      setNewSong({ title: "", cover: null, audioFile: null });
      setShowForm(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">🎵 Новинки песен</h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить трек
        </Button>
      </div>

      {/* Форма добавления */}
      {showForm && (
        <div className="bg-white/5 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Добавить новый трек
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-white">
                Название трека
              </Label>
              <Input
                id="title"
                value={newSong.title}
                onChange={(e) =>
                  setNewSong((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Введите название..."
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div>
              <Label htmlFor="cover" className="text-white">
                Обложка (200x200)
              </Label>
              <Input
                id="cover"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileChange("cover", e.target.files?.[0] || null)
                }
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div>
              <Label htmlFor="audio" className="text-white">
                Аудио файл
              </Label>
              <Input
                id="audio"
                type="file"
                accept="audio/*"
                onChange={(e) =>
                  handleFileChange("audioFile", e.target.files?.[0] || null)
                }
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleAddSong}
                className="bg-green-600 hover:bg-green-700"
              >
                <Icon name="Check" size={16} className="mr-2" />
                Добавить
              </Button>
              <Button
                onClick={() => setShowForm(false)}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Отмена
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Список новинок */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {songs.map((song) => (
          <div key={song.id} className="text-center group">
            {/* Обложка с красивым дизайном */}
            <div className="relative mb-4">
              <div
                className={`relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 group-hover:scale-105 ${
                  currentPlaying === song.id
                    ? "ring-4 ring-purple-400 ring-opacity-75 shadow-purple-500/50"
                    : "shadow-black/30"
                }`}
              >
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-[200px] h-[200px] object-cover"
                />
                {/* Градиентный оверлей */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Бейдж "Новинка" с анимацией */}
                <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                  ✨ Новинка
                </div>

                {/* Пульсирующий индикатор воспроизведения */}
                {currentPlaying === song.id && (
                  <div className="absolute inset-0 rounded-xl">
                    <div className="absolute inset-0 rounded-xl bg-purple-400/20 animate-pulse" />
                    <div className="absolute top-4 left-4">
                      <div className="flex space-x-1">
                        <div
                          className="w-1 h-4 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-1 h-4 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-1 h-4 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Название трека с красивым шрифтом */}
            <h3 className="text-white font-semibold mb-4 truncate text-lg tracking-wide">
              {song.title}
            </h3>

            {/* Красивая кнопка плеера */}
            <div
              className={`relative transition-all duration-300 ${
                currentPlaying === song.id ? "animate-pulse" : ""
              }`}
            >
              <button
                onClick={() => handlePlay(song.id)}
                className={`relative w-full py-3 px-6 rounded-full font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
                  currentPlaying === song.id
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/40 focus:ring-green-400"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30 hover:from-purple-500 hover:to-indigo-500 focus:ring-purple-400"
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Icon
                    name={currentPlaying === song.id ? "Pause" : "Play"}
                    size={18}
                    className={
                      currentPlaying === song.id ? "animate-pulse" : ""
                    }
                  />
                  <span className="font-semibold">
                    {currentPlaying === song.id ? "⏸️ Пауза" : "▶️ Играть"}
                  </span>
                </div>

                {/* Эффект свечения при активном плеере */}
                {currentPlaying === song.id && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/30 to-emerald-400/30 animate-ping" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewReleases;
