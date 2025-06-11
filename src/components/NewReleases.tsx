import React, { useState, useRef, useEffect } from "react";
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

const NewReleases = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [audioRefs, setAudioRefs] = useState<{
    [key: string]: HTMLAudioElement;
  }>({});

  // Форма для добавления песни
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    coverFile: null as File | null,
    audioFile: null as File | null,
  });

  // Проверка админа (простая проверка по паролю)
  const handleAdminLogin = () => {
    const password = prompt("Введите пароль администратора:");
    if (password === "admin123") {
      setIsAdmin(true);
      setShowAdminPanel(true);
    } else {
      alert("Неверный пароль!");
    }
  };

  // Создание URL для файлов
  const createFileUrl = (file: File) => {
    return URL.createObjectURL(file);
  };

  // Добавление новой песни
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

    // Сброс формы
    setFormData({
      title: "",
      artist: "",
      coverFile: null,
      audioFile: null,
    });

    // Сброс input файлов
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input: any) => (input.value = ""));
  };

  // Управление воспроизведением
  const togglePlay = (songId: string, audioUrl: string) => {
    // Останавливаем все остальные треки
    Object.values(audioRefs).forEach((audio) => {
      if (audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    if (currentPlaying === songId) {
      // Останавливаем текущий трек
      const audio = audioRefs[songId];
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      setCurrentPlaying(null);
    } else {
      // Запускаем новый трек
      let audio = audioRefs[songId];
      if (!audio) {
        audio = new Audio(audioUrl);
        audio.volume = 0.7;
        setAudioRefs((prev) => ({ ...prev, [songId]: audio }));

        audio.addEventListener("ended", () => {
          setCurrentPlaying(null);
        });
      }

      audio.play().catch(console.error);
      setCurrentPlaying(songId);
    }
  };

  // Удаление песни (только для админа)
  const handleDeleteSong = (songId: string) => {
    if (window.confirm("Удалить эту песню?")) {
      setSongs((prev) => prev.filter((song) => song.id !== songId));

      // Останавливаем и удаляем аудио
      const audio = audioRefs[songId];
      if (audio) {
        audio.pause();
        URL.revokeObjectURL(audio.src);
      }
      setAudioRefs((prev) => {
        const newRefs = { ...prev };
        delete newRefs[songId];
        return newRefs;
      });

      if (currentPlaying === songId) {
        setCurrentPlaying(null);
      }
    }
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Icon name="Music" size={24} className="text-purple-400" />
          Новинки
        </h2>

        {!isAdmin ? (
          <Button
            onClick={handleAdminLogin}
            variant="outline"
            size="sm"
            className="text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            <Icon name="Settings" size={16} />
            Админ
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              variant="outline"
              size="sm"
              className="text-gray-300 border-gray-600 hover:bg-gray-700"
            >
              <Icon name={showAdminPanel ? "X" : "Plus"} size={16} />
              {showAdminPanel ? "Закрыть" : "Добавить"}
            </Button>
            <Button
              onClick={() => setIsAdmin(false)}
              variant="outline"
              size="sm"
              className="text-red-400 border-red-600 hover:bg-red-700/20"
            >
              <Icon name="LogOut" size={16} />
            </Button>
          </div>
        )}
      </div>

      {/* Административная панель */}
      {isAdmin && showAdminPanel && (
        <div className="mb-6 p-4 bg-gray-900/50 rounded-lg border border-gray-600">
          <h3 className="text-lg font-semibold text-white mb-4">
            Добавить новую песню
          </h3>

          <form onSubmit={handleAddSong} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title" className="text-gray-300">
                  Название песни
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="Введите название"
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
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="Введите исполнителя"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cover" className="text-gray-300">
                  Обложка (200x200px)
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
                  className="bg-gray-800 border-gray-600 text-white file:bg-purple-600 file:text-white file:border-0 file:rounded"
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
                  className="bg-gray-800 border-gray-600 text-white file:bg-purple-600 file:text-white file:border-0 file:rounded"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить песню
            </Button>
          </form>
        </div>
      )}

      {/* Сетка песен */}
      {songs.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <Icon name="Music" size={48} className="mx-auto mb-4 opacity-50" />
          <p>Пока нет добавленных песен</p>
          {isAdmin && (
            <p className="text-sm mt-2">
              Добавьте первую песню через панель администратора
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {songs.map((song) => (
            <div key={song.id} className="relative group">
              <div
                className="relative w-full aspect-square rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => togglePlay(song.id, song.audioUrl)}
              >
                {/* Обложка */}
                <img
                  src={song.coverUrl}
                  alt={`${song.title} - ${song.artist}`}
                  className="w-full h-full object-cover"
                />

                {/* Оверлей с плеером */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className={`w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ${currentPlaying === song.id ? "animate-pulse bg-purple-500/40" : ""}`}
                  >
                    <Icon
                      name={currentPlaying === song.id ? "Pause" : "Play"}
                      size={24}
                      className="text-white ml-1"
                    />
                  </div>
                </div>

                {/* Индикатор воспроизведения */}
                {currentPlaying === song.id && (
                  <div className="absolute top-2 right-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}

                {/* Кнопка удаления для админа */}
                {isAdmin && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSong(song.id);
                    }}
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 left-2 w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                )}
              </div>

              {/* Информация о песне */}
              <div className="mt-2 text-center">
                <h4
                  className="text-white font-medium text-sm truncate"
                  title={song.title}
                >
                  {song.title}
                </h4>
                <p
                  className="text-gray-400 text-xs truncate"
                  title={song.artist}
                >
                  {song.artist}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewReleases;
