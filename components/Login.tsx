
import React, { useState } from 'react';
import { User, UserGender, Intention } from '../types';
import TbyMLogo from './Logo';

interface LoginProps {
  onSwitch: () => void;
  onSuccess: (user: User) => void;
}

export default function Login({ onSwitch, onSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter all fields');
      return;
    }

    // Admin backdoor for testing
    if (email === 'admin@tbym.com') {
      onSuccess({
        id: 'admin',
        email,
        firstName: 'Administrator',
        gender: UserGender.MALE,
        age: 35,
        intention: Intention.ACTIVE,
        isPreparationMode: false,
        isAdmin: true
      });
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('tbym_all_users') || '[]');
    const user = existingUsers.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      onSuccess(user);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-100 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-10 md:p-14 border border-stone-100 relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <div className="scale-75 mb-4">
            <TbyMLogo />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2 italic tracking-tighter">Welcome Back</h1>
          <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Real Talk &bull; No Bakwas</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-2">Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com"
              className="w-full p-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900/5 font-bold transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full p-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900/5 font-bold transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
              <p className="text-red-600 text-[10px] font-black uppercase tracking-widest text-center italic">{error}</p>
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition shadow-xl shadow-slate-200"
          >
            Sign In
          </button>
        </form>

        <div className="mt-10 text-center space-y-4">
          <button 
            onClick={onSwitch} 
            className="text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-slate-900 transition"
          >
            Don't have an account? <span className="text-slate-900">Sign Up</span>
          </button>
        </div>
      </div>
    </div>
  );
}
