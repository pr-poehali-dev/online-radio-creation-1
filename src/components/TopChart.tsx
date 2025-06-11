import React, { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

interface Song {
  id: number;
  position: number;
  title: string;
  artist: string;
  audioFile?: string;
  likes: number;
  dislikes: number;
  addedAt: Date;
}

const TopChart = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    position: 1,
    audioFile: null as File | null,
  });

  const audioRefs = useRef<{ [key: number]: HTMLAudioElement }>({});

  useEffect(() => {
    const savedSongs = localStorage.getItem("topChartSongs");
    if (savedSongs) {
      setSongs(JSON.parse(savedSongs));
    }
  }, []);

  const saveSongs = (updatedSongs: Song[]) => {
    localStorage.setItem("topChartSongs", JSON.stringify(updatedSongs));
    setSongs(updatedSongs);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setNewSong({ ...newSong, audioFile: file });
    }
  };

  const addSong = async () => {
    if (!newSong.title.trim() || !newSong.artist.trim()) return;

    let audioFileUrl = "";
    if (newSong.audioFile) {
      audioFileUrl = URL.createObjectURL(newSong.audioFile);
    }

    const song: Song = {
      id: Date.now(),
      position: newSong.position,
      title: newSong.title.trim(),
      artist: newSong.artist.trim(),
      audioFile: audioFileUrl,
      likes: 0,
      dislikes: 0,
      addedAt: new Date(),
    };

    const updatedSongs = [...songs, song].sort(
      (a, b) => a.position - b.position,
    );
    saveSongs(updatedSongs);

    setNewSong({ title: "", artist: "", position: 1, audioFile: null });
    setIsAddingNew(false);
  };

  const removeSong = (id: number) => {
    const updatedSongs = songs.filter((song) => song.id !== id);
    saveSongs(updatedSongs);
  };

  const togglePlay = (songId: number) => {
    const audio = audioRefs.current[songId];
    if (!audio) return;

    // Остановить все другие треки
    Object.entries(audioRefs.current).forEach(([id, audioEl]) => {
      if (parseInt(id) !== songId) {
        audioEl.pause();
        audioEl.currentTime = 0;
      }
    });

    if (currentlyPlaying === songId) {
      audio.pause();
      setCurrentlyPlaying(null);
    } else {
      audio.play();
      setCurrentlyPlaying(songId);
    }
  };

  const handleLike = (songId: number, isLike: boolean) => {
    const updatedSongs = songs.map((song) => {
      if (song.id === songId) {
        return {
          ...song,
          likes: isLike ? song.likes + 1 : song.likes,
          dislikes: !isLike ? song.dislikes + 1 : song.dislikes,
        };
      }
      return song;
    });
    saveSongs(updatedSongs);
  };

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `${position}.`;
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="TrendingUp" size={20} />
          <span>Топ чарт</span>
        </div>
        <button
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="text-purple-300 hover:text-white transition-colors"
        >
          <Icon name="Plus" size={20} />
        </button>
      </div>

      {isAddingNew && (
        <div className="mb-4 p-3 bg-white/5 rounded-lg border border-purple-300/20">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Название трека"
              value={newSong.title}
              onChange={(e) =>
                setNewSong({ ...newSong, title: e.target.value })
              }
              className="w-full px-3 py-2 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-purple-300"
            />
            <input
              type="text"
              placeholder="Исполнитель"
              value={newSong.artist}
              onChange={(e) =>
                setNewSong({ ...newSong, artist: e.target.value })
              }
              className="w-full px-3 py-2 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-purple-300"
            />
            <input
              type="number"
              placeholder="Позиция"
              min="1"
              value={newSong.position}
              onChange={(e) =>
                setNewSong({
                  ...newSong,
                  position: parseInt(e.target.value) || 1,
                })
              }
              className="w-full px-3 py-2 bg-white/10 border border-purple-300/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-purple-300"
            />
            <div className="space-y-2">
              <label className="block text-purple-300 text-sm">
                Загрузить аудиофайл
              </label>
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileSelect}
                className="w-full px-3 py-2 bg-white/10 border border-purple-300/30 rounded-lg text-white file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-purple-600 file:text-white hover:file:bg-purple-700"
              />
              {newSong.audioFile && (
                <p className="text-purple-300 text-xs">
                  Выбран файл: {newSong.audioFile.name}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={addSong}
                className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Добавить
              </button>
              <button
                onClick={() => setIsAddingNew(false)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-purple-300 rounded-lg transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {songs.length === 0 ? (
          <p className="text-purple-300 text-sm text-center py-4">
            Пока нет треков в чарте
          </p>
        ) : (
          songs.map((song) => (
            <div
              key={song.id}
              className="flex items-center gap-3 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group"
            >
              <span className="text-lg font-bold text-purple-300 min-w-[2rem]">
                {getPositionIcon(song.position)}
              </span>

              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">
                  {song.title}
                </p>
                <p className="text-purple-300 text-xs truncate">
                  {song.artist}
                </p>
              </div>

              {/* Плеер */}
              {song.audioFile && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePlay(song.id)}
                    className="text-purple-300 hover:text-white transition-colors"
                  >
                    <Icon
                      name={currentlyPlaying === song.id ? "Pause" : "Play"}
                      size={16}
                    />
                  </button>
                  <audio
                    ref={(el) => {
                      if (el) audioRefs.current[song.id] = el;
                    }}
                    src={song.audioFile}
                    onEnded={() => setCurrentlyPlaying(null)}
                  />
                </div>
              )}

              {/* Лайки/дизлайки */}
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => handleLike(song.id, true)}
                  className="flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors"
                >
                  <Icon name="ThumbsUp" size={14} />
                  <span>{song.likes}</span>
                </button>
                <button
                  onClick={() => handleLike(song.id, false)}
                  className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Icon name="ThumbsDown" size={14} />
                  <span>{song.dislikes}</span>
                </button>
              </div>

              <button
                onClick={() => removeSong(song.id)}
                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopChart;
