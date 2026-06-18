import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';
import { Play, Clock, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch songs from API
    const fetchSongs = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${apiUrl}/api/songs`);
        if (response.ok) {
          const data = await response.json();
          setSongs(data);
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [navigate]);

  const handlePlaySong = (index) => {
    if (currentSongIndex === index) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <Loader className="w-10 h-10 text-green-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-black">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 bg-zinc-900 rounded-lg m-2 ml-0 md:ml-2 overflow-y-auto bg-gradient-to-b from-indigo-900/40 to-zinc-900">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-6">Good evening</h1>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Your Cloud Playlist</h2>
              
              <div className="bg-zinc-900/50 backdrop-blur-md rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center text-zinc-400 border-b border-zinc-800 pb-2 mb-4 px-4">
                  <div className="w-12 text-center">#</div>
                  <div className="flex-1">Title</div>
                  <div className="flex-1 hidden md:block">Artist</div>
                  <div className="w-16 flex justify-center"><Clock className="w-4 h-4" /></div>
                </div>

                {/* Song List */}
                <div className="space-y-1">
                  {songs.length > 0 ? songs.map((song, index) => {
                    const isCurrentSong = currentSongIndex === index;
                    
                    return (
                      <div 
                        key={song._id || index}
                        onClick={() => handlePlaySong(index)}
                        className={`flex items-center px-4 py-2 rounded-md hover:bg-white/10 group cursor-pointer transition-colors ${isCurrentSong ? 'bg-white/10' : ''}`}
                      >
                        <div className="w-12 text-center text-zinc-400 group-hover:hidden flex justify-center items-center h-full">
                          {isCurrentSong && isPlaying ? (
                            <div className="playing-bars">
                              <span></span><span></span><span></span>
                            </div>
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div className="w-12 hidden group-hover:flex justify-center text-white">
                          <Play className="w-4 h-4 fill-current" />
                        </div>
                        
                        <div className="flex-1 flex items-center gap-4">
                          <img src={song.coverPath} alt={song.title} className="w-10 h-10 rounded shadow-sm" />
                          <span className={`font-medium ${isCurrentSong ? 'text-green-500' : 'text-white'}`}>
                            {song.title}
                          </span>
                        </div>

                        <div className="flex-1 hidden md:block text-zinc-400 text-sm">
                          {song.artist}
                        </div>
                        
                        <div className="w-16 text-center text-zinc-400 text-sm">
                          {song.timestamp}
                        </div>
                      </div>
                    );
                  }) : (
                    <div className="text-zinc-400 text-center py-8">No songs available in database.</div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Some aesthetic padding at the bottom for scrolling */}
            <div className="h-24"></div>
          </div>
        </main>
      </div>

      {songs.length > 0 && (
        <Player 
          songs={songs}
          currentSongIndex={currentSongIndex}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setCurrentSongIndex={setCurrentSongIndex}
        />
      )}
    </div>
  );
};

export default Home;
