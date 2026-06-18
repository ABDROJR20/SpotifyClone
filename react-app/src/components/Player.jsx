import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from 'lucide-react';

const Player = ({ songs, currentSongIndex, isPlaying, setIsPlaying, setCurrentSongIndex }) => {
  const currentSong = songs[currentSongIndex];
  const audioRef = useRef(new Audio(currentSong?.filePath));
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(e => console.log('Audio play error:', e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSongIndex]);

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.filePath;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Audio play error:', e));
      }
    }
  }, [currentSongIndex, currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    
    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSongIndex]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const handleProgressChange = (e) => {
    const newProgress = e.target.value;
    setProgress(newProgress);
    audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  if (!currentSong) return null;

  return (
    <div className="h-24 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between px-4 z-50 relative">
      {/* Song Info */}
      <div className="flex items-center gap-4 w-1/4 min-w-[180px]">
        <img src={currentSong.coverPath} alt={currentSong.title} className="w-14 h-14 rounded-md shadow-lg" />
        <div className="hidden sm:block">
          <h4 className="text-white text-sm font-semibold truncate">{currentSong.title}</h4>
          <p className="text-xs text-zinc-400">{currentSong.artist}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center max-w-[40%] w-full gap-2">
        <div className="flex items-center gap-6">
          <button className="text-zinc-400 hover:text-white transition hidden sm:block">
            <Shuffle className="w-5 h-5" />
          </button>
          <button onClick={handlePrev} className="text-zinc-400 hover:text-white transition">
            <SkipBack className="w-6 h-6 fill-current" />
          </button>
          <button 
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition transform"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
          </button>
          <button onClick={handleNext} className="text-zinc-400 hover:text-white transition">
            <SkipForward className="w-6 h-6 fill-current" />
          </button>
          <button className="text-zinc-400 hover:text-white transition hidden sm:block">
            <Repeat className="w-5 h-5" />
          </button>
        </div>
        
        <div className="w-full flex items-center gap-2">
          <span className="text-xs text-zinc-400 min-w-[35px] text-right">
            {formatTime(audioRef.current?.currentTime || 0)}
          </span>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={progress || 0}
            onChange={handleProgressChange}
            className="w-full h-1 bg-zinc-600 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-green-400"
          />
          <span className="text-xs text-zinc-400 min-w-[35px]">
            {currentSong.timestamp}
          </span>
        </div>
      </div>

      {/* Volume */}
      <div className="w-1/4 flex items-center justify-end gap-3 min-w-[120px] hidden md:flex">
        <Volume2 className="w-5 h-5 text-zinc-400" />
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 h-1 bg-zinc-600 rounded-lg appearance-none cursor-pointer accent-white hover:accent-green-500"
        />
      </div>
    </div>
  );
};

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default Player;
