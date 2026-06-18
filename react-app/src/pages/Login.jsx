import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/home');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-zinc-950/50 backdrop-blur-md border border-zinc-800 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center">
          <img src="/logo.png" alt="Spotify Logo" className="w-16 h-16 mb-4" />
          <h2 className="text-3xl font-bold text-white text-center">Log in to Spotify Clone</h2>
        </div>
        
        {error && <div className="p-3 bg-red-500/20 border border-red-500 text-red-500 rounded text-center">{error}</div>}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Password"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3 px-4 bg-green-500 hover:bg-green-400 text-black font-bold rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            Log In
          </button>
        </form>

        <div className="pt-6 border-t border-zinc-800 text-center">
          <p className="text-zinc-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-white hover:text-green-500 font-semibold underline underline-offset-2 transition-colors">
              Sign up for Spotify Clone
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
