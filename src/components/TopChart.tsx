import React, { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  audioUrl: string;
  addedAt: Date;
}

const TopChart = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [audioRefs, setAudioRefs] = useState<{
    [key: string]: HTMLAudioElement;
  }>({});

  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    coverFile: null as File | null,
    audioFile: null as File | null,
  });

  const handleAdminLogin = () => {
    const password = prompt("Введите пароль администратора:");
    if (password === "admin123") {
      setIsAdmin(true);
      setShowAdminPanel(true);
    } else {
      alert("Неверный пароль!");
    }
  };

  const createFileUrl = (file: File) => {
    return URL.createObjectURL(file);
  };

  const handleAddSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.artist ||
      !formData.coverFile ||
      !formData.audioFile
    ) {
      alert("Заполните все поля!");
      return;
    }

    const newSong: Song = {
      id: Date.now().toString(),
      title: formData.title,
      artist: formData.artist,
      coverUrl: createFileUrl(formData.coverFile),
      audioUrl: createFileUrl(formData.audioFile),
      addedAt: new Date(),
    };

    setSongs((prev) => [newSong, ...prev]);
    setFormData({ title: "", artist: "", coverFile: null, audioFile: null });
  };

  const handlePlayPause = (songId: string, audioUrl: string) => {
    // Останавливаем все остальные треки
    Object.values(audioRefs).forEach((audio) => {
      if (audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    if (currentPlaying === songId) {
      setCurrentPlaying(null);
      return;
    }

    // Создаем новый аудио элемент если его нет
    if (!audioRefs[songId]) {
      const audio = new Audio(audioUrl);
      audio.addEventListener("ended", () => {
        setCurrentPlaying(null);
      });
      setAudioRefs((prev) => ({ ...prev, [songId]: audio }));
    }

    audioRefs[songId].play();
    setCurrentPlaying(songId);
  };

  const removeSong = (songId: string) => {
    if (audioRefs[songId]) {
      audioRefs[songId].pause();
      URL.revokeObjectURL(audioRefs[songId].src);
    }
    setSongs((prev) => prev.filter((song) => song.id !== songId));
    setAudioRefs((prev) => {
      const newRefs = { ...prev };
      delete newRefs[songId];
      return newRefs;
    });
    if (currentPlaying === songId) {
      setCurrentPlaying(null);
    }
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Icon name="Trophy" size={24} className="text-yellow-500" />
          Топ Чарт
        </h2>

        {!isAdmin && (
          <Button
            onClick={handleAdminLogin}
            variant="outline"
            size="sm"
            className="bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600"
          >
            <Icon name="Settings" size={16} className="mr-2" />
            Админ
          </Button>
        )}
      </div>

      {/* Админ панель */}
      {isAdmin && showAdminPanel && (
        <div className="mb-6 p-4 bg-gray-700/50 rounded-xl border border-gray-600/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Добавить трек</h3>
            <Button
              onClick={() => setShowAdminPanel(false)}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          <form onSubmit={handleAddSong} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title" className="text-gray-300">
                  Название
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="bg-gray-600/50 border-gray-500 text-white"
                  placeholder="Название трека"
                />
              </div>
              <div>
                <Label htmlFor="artist" className="text-gray-300">
                  Исполнитель
                </Label>
                <Input
                  id="artist"
                  value={formData.artist}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, artist: e.target.value }))
                  }
                  className="bg-gray-600/50 border-gray-500 text-white"
                  placeholder="Имя исполнителя"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cover" className="text-gray-300">
                  Обложка
                </Label>
                <Input
                  id="cover"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      coverFile: e.target.files?.[0] || null,
                    }))
                  }
                  className="bg-gray-600/50 border-gray-500 text-white"
                />
              </div>
              <div>
                <Label htmlFor="audio" className="text-gray-300">
                  Аудиофайл
                </Label>
                <Input
                  id="audio"
                  type="file"
                  accept="audio/*"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      audioFile: e.target.files?.[0] || null,
                    }))
                  }
                  className="bg-gray-600/50 border-gray-500 text-white"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить в топ
            </Button>
          </form>
        </div>
      )}

      {/* Список треков */}
      <div className="space-y-3">
        {songs.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Icon name="Music" size={48} className="mx-auto mb-3 opacity-50" />
            <p>Топ чарт пуст</p>
            {isAdmin && (
              <Button
                onClick={() => setShowAdminPanel(true)}
                variant="ghost"
                className="mt-2 text-yellow-500 hover:text-yellow-400"
              >
                Добавить первый трек
              </Button>
            )}
          </div>
        ) : (
          songs.map((song, index) => (
            <div
              key={song.id}
              className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors"
            >
              {/* Номер в чарте */}
              <div className="text-yellow-500 font-bold text-lg w-6 text-center">
                {index + 1}
              </div>

              {/* Обложка с плеером */}
              <div className="relative group">
                <img
                  src={song.coverUrl}
                  alt={song.title}
                  className="w-12 h-12 rounded-lg object-cover cursor-pointer"
                  onClick={() => handlePlayPause(song.id, song.audioUrl)}
                />

                {/* Кнопка воспроизведения на обложке */}
                <div
                  className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => handlePlayPause(song.id, song.audioUrl)}
                >
                  <Icon
                    name={currentPlaying === song.id ? "Pause" : "Play"}
                    size={20}
                    className="text-white"
                  />
                </div>

                {/* Индикатор воспроизведения */}
                {currentPlaying === song.id && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                )}
              </div>

              {/* Информация о треке */}
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium truncate">
                  {song.title}
                </h4>
                <p className="text-gray-400 text-sm truncate">{song.artist}</p>
              </div>

              {/* Кнопка удаления для админа */}
              {isAdmin && (
                <Button
                  onClick={() => removeSong(song.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopChart;
