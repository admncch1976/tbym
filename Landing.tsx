
import React, { useState } from 'react';
import TbyMLogo from './Logo';
import { UserGender } from '../types';

interface LandingProps {
  onQuickStart: (data: { firstName: string; age: number; gender: UserGender }) => void;
  onNavigateLogin: () => void;
}

export default function Landing({ onQuickStart, onNavigateLogin }: LandingProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    age: '',
    gender: UserGender.MALE
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.age) {
      onQuickStart({
        firstName: formData.firstName,
        age: parseInt(formData.age),
        gender: formData.gender
      });
    }
  };

  const isMale = formData.gender === UserGender.MALE;

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-3 md:p-6 overflow-hidden bg-stone-50">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#D1E9E9] via-stone-50 to-[#F9E1E1] opacity-80"></div>
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl w-full animate-in fade-in zoom-in duration-1000">
        <div className="mb-2 md:mb-6 scale-[0.6] md:scale-100 origin-center">
          <TbyMLogo />
        </div>

        <div className="mb-3 md:mb-8 px-2">
          <h1 className="animated-text-glow text-2xl sm:text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] md:leading-none">
            Talk before you Marry
          </h1>
          <p className="mt-1 md:mt-4 text-slate-900 text-[10px] md:text-sm font-black uppercase tracking-[0.4em] md:tracking-[0.6em] italic opacity-80">
            Real Talk. No Bakwas.
          </p>
        </div>

        <div className="w-full max-w-[98%] md:max-w-md bg-white p-5 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white shadow-2xl shadow-slate-200/40 transition-all hover:shadow-slate-300/50 mb-6 md:mb-10">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="text-left">
                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1 ml-2">First Name</label>
                <input 
                  type="text" 
                  placeholder="Name"
                  required
                  className="w-full p-3 md:p-4 bg-stone-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-[#1A4B58]/10 font-bold transition-all text-base md:text-lg"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div className="text-left">
                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1 ml-2">Age</label>
                <input 
                  type="number" 
                  placeholder="Age"
                  required
                  min="18"
                  className="w-full p-3 md:p-4 bg-stone-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-[#1A4B58]/10 font-bold transition-all text-base md:text-lg"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2 text-left ml-2">I am a...</label>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, gender: UserGender.MALE})}
                  className={`py-3 md:py-4 rounded-xl border-2 font-black text-[10px] md:text-xs tracking-widest transition-all ${isMale ? 'bg-[#1A4B58] border-[#1A4B58] text-white shadow-lg' : 'bg-stone-50 border-white text-slate-400'}`}
                >
                  MAN
                </button>
                <button 
                  type="button"
                  onClick={() => setFormData({...formData, gender: UserGender.FEMALE})}
                  className={`py-3 md:py-4 rounded-xl border-2 font-black text-[10px] md:text-xs tracking-widest transition-all ${!isMale ? 'bg-[#8B3A4D] border-[#8B3A4D] text-white shadow-lg' : 'bg-stone-50 border-white text-slate-400'}`}
                >
                  WOMAN
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 md:py-5 rounded-xl md:rounded-2xl bg-slate-900 text-white font-black tracking-[0.2em] text-[10px] uppercase shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-300"
            >
              Start Discerning
            </button>
          </form>

          <div className="mt-4 md:mt-8">
            <button 
              onClick={onNavigateLogin}
              className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
            >
              Already have an account? Login
            </button>
          </div>
        </div>

        <div className="w-full max-w-[98%] md:max-w-2xl space-y-3 md:space-y-6 bg-white/20 backdrop-blur-xl py-4 md:py-10 px-4 md:px-8 rounded-[2rem] md:rounded-[3rem] border border-white/40 shadow-xl shadow-stone-200/30">
          <blockquote className="serif-quote text-[14px] md:text-2xl leading-snug md:leading-relaxed text-slate-800 italic px-2 md:px-8 mx-auto shining-quote font-medium">
            “Friendship is a deep oneness that develops when two people, speaking the truth in love to one another, journey together to the same horizon.”
          </blockquote>
          <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">
            — Timothy Keller
          </p>
        </div>
      </div>
    </div>
  );
}
