
import React, { useState } from 'react';
import { User, UserGender, Intention } from '../types';
import { LANDING_QUOTE } from '../constants';
import TbyMLogo from './Logo';

interface LoginProps {
  onSwitch: () => void;
  onSuccess: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onSwitch, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter all fields');
      return;
    }

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
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Left Side: Creative Brand Section */}
        <div className="p-12 flex flex-col items-center justify-center text-slate-900 bg-white border-r border-slate-50 relative overflow-hidden">
          <TbyMLogo size={120} className="mb-6" />
          
          <h1 className="text-4xl font-black mb-1 tracking-tighter text-[#2C5E7A]">TbyM</h1>
          <div className="bg-slate-900 text-white px-4 py-1.5 mb-8 rounded shadow-sm">
            <span className="text-sm font-bold uppercase tracking-widest">Talk Before You Marry</span>
          </div>
          
          <p className="text-lg font-medium leading-relaxed italic text-slate-500 text-center px-4 mb-8">
            "{LANDING_QUOTE}"
          </p>
          
          <div className="mt-auto">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">Real Talk. No Bakwas.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-12 flex flex-col justify-center bg-stone-50/20">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h3>
            <p className="text-slate-500">Sign in to continue your discernment.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#2C5E7A] mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-[#2C5E7A] outline-none transition-all font-medium"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#84898E] mb-2">Password</label>
              <input 
                type="password" 
                className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-[#2C5E7A] outline-none transition-all font-medium"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-xs font-bold italic bg-red-50 p-2 rounded text-center">{error}</p>}

            <button 
              type="submit" 
              className="w-full bg-slate-900 text-white p-4 rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition shadow-xl"
            >
              Sign In
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 font-medium">
              New here? {' '}
              <button onClick={onSwitch} className="text-[#2C5E7A] font-bold hover:underline">Create Account</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
