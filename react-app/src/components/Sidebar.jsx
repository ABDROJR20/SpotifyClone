import React from 'react';
import { Home as HomeIcon, Search, Library, PlusSquare, Heart, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-black h-full flex flex-col hidden md:flex">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8 text-white">
          <img src="/logo.png" alt="Spotify" className="w-8 h-8" />
          <span className="text-xl font-bold">Spotify Clone</span>
        </div>
        
        <div className="space-y-4">
          <button className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors w-full font-semibold">
            <HomeIcon className="w-6 h-6" />
            <span>Home</span>
          </button>
          <button className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors w-full font-semibold">
            <Search className="w-6 h-6" />
            <span>Search</span>
          </button>
          <button className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors w-full font-semibold">
            <Library className="w-6 h-6" />
            <span>Your Library</span>
          </button>
        </div>

        <div className="mt-8 space-y-4">
          <button className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors w-full font-semibold">
            <div className="w-6 h-6 bg-zinc-400 text-black flex items-center justify-center rounded-sm">
              <PlusSquare className="w-4 h-4" />
            </div>
            <span>Create Playlist</span>
          </button>
          <button className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors w-full font-semibold">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-600 to-blue-300 text-white flex items-center justify-center rounded-sm">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <span>Liked Songs</span>
          </button>
        </div>
      </div>
      
      <div className="mt-auto p-6">
        <button 
          onClick={() => navigate('/login')}
          className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors w-full font-semibold"
        >
          <LogOut className="w-6 h-6" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
