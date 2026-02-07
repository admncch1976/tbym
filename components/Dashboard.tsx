
import React, { useState, useEffect } from 'react';
import { User, UserGender } from '../types';
import { ADULT_DECKS } from '../constants';

interface DashboardProps {
  user: User;
  setView: (v: any) => void;
  updateUserData: (updates: Partial<User>) => void;
  onRegister: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, setView }) => {
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const quotes = [
      "Marriage is not about finding a person who is 'perfect' for you; it's about two people who are willing to grow together.",
      "To be loved but not known is comforting but superficial. But to be fully known and truly loved is, well, a lot like being loved by God.",
      "The essence of marriage is a sacrificial commitment to the good of the other."
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const isMale = user.gender === UserGender.MALE;
  const accentColor = isMale ? 'text-[#2C5E7A]' : 'text-[#C5A059]';
  const buttonBg = isMale ? 'bg-[#2C5E7A]' : 'bg-[#C5A059]';

  const selectedDeck = ADULT_DECKS.find(d => d.id === selectedDeckId);

  const nextCard = () => {
    if (selectedDeck && currentCardIndex < selectedDeck.questions.length - 1) {
      setFlipped(false);
      setTimeout(() => setCurrentCardIndex(currentCardIndex + 1), 150);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setFlipped(false);
      setTimeout(() => setCurrentCardIndex(currentCardIndex - 1), 150);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      {/* 1. TOP: Progress & Self-Assessment */}
      <section className="bg-white border-b border-stone-100 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4 flex items-center space-x-8">
            <div className="relative w-32 h-32 flex-shrink-0">
               <svg className="w-full h-full transform -rotate-90">
                 <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-stone-100" />
                 <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                   strokeDasharray={364.4} 
                   strokeDashoffset={364.4 - (364.4 * (user.scores?.total || 0)) / 100} 
                   className={isMale ? 'text-[#2C5E7A]' : 'text-[#C5A059]'} 
                 />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-black">{user.scores?.total || 0}%</span>
               </div>
            </div>
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Covenant Index</h2>
              <p className="text-2xl font-black text-slate-900 leading-tight">Know Yourself</p>
              <p className="text-xs font-medium text-slate-400 mt-1 italic">Growth Assessment</p>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
             <button 
               onClick={() => setView('quiz')}
               className={`${buttonBg} text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-3`}
             >
               <span>My Readiness Quiz</span>
               <span className="opacity-50">→</span>
             </button>
          </div>

          <div className="lg:col-span-4 bg-stone-50 p-6 rounded-3xl border border-stone-100 italic text-slate-500 text-sm">
             "{quote}"
          </div>
        </div>
      </section>

      {/* 2. MIDDLE: Marriage Conversation Decks */}
      <section className="px-6 py-16 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col items-center text-center">
           <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-2">Guided Discernment</h4>
           <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic">Marriage Conversations</h3>
        </div>

        {!selectedDeckId ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ADULT_DECKS.map((deck) => (
              <div 
                key={deck.id} 
                onClick={() => { setSelectedDeckId(deck.id); setCurrentCardIndex(0); setFlipped(false); }}
                className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group h-64 flex flex-col justify-between hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                   <span className="text-4xl filter grayscale group-hover:grayscale-0 transition-all">{deck.icon}</span>
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{deck.questions.length} Cards</span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:italic transition-all">{deck.title}</h3>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-2">{deck.description}</p>
                </div>
                <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                   <span className={`${accentColor} text-xs font-black uppercase tracking-widest`}>Open Deck →</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex justify-between items-center">
               <button onClick={() => setSelectedDeckId(null)} className="text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-900 flex items-center">
                 <span className="mr-2">←</span> Back to Categories
               </button>
               <div className="flex items-center space-x-3">
                  <span className="text-2xl">{selectedDeck?.icon}</span>
                  <h3 className="text-2xl font-black italic">{selectedDeck?.title}</h3>
               </div>
               <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{currentCardIndex + 1} / {selectedDeck?.questions.length}</span>
            </div>
            
            <div className="h-[450px] perspective-1000 group">
              <div 
                className={`relative w-full h-full transition-all duration-700 preserve-3d cursor-pointer ${flipped ? 'rotate-y-180' : ''}`}
                onClick={() => setFlipped(!flipped)}
              >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-white border border-stone-200 rounded-[3.5rem] p-16 flex flex-col justify-center text-center shadow-xl">
                   <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-10">Question</p>
                   <p className="text-3xl font-black text-slate-800 leading-tight italic">
                     "{selectedDeck?.questions[currentCardIndex]}"
                   </p>
                   <div className="mt-16 pt-8 border-t border-slate-50">
                     <span className="text-xs font-black uppercase tracking-widest text-slate-300 animate-pulse">Tap to Reveal Prompts</span>
                   </div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 backface-hidden bg-[#1A1A1A] border border-white/10 rounded-[3.5rem] p-16 flex flex-col justify-center text-center rotate-y-180 text-white shadow-2xl">
                   <p className="text-xs font-black uppercase tracking-[0.4em] text-white/40 mb-10">Discernment Prompts</p>
                   <div className="space-y-6">
                      {selectedDeck?.prompts[currentCardIndex].map((p, pIdx) => (
                        <p key={pIdx} className="text-lg font-medium italic opacity-90 leading-relaxed border-l-4 border-white/10 pl-6 text-left">"{p}"</p>
                      ))}
                   </div>
                   <div className="mt-16 pt-8 border-t border-white/10">
                     <span className="text-xs font-black uppercase tracking-widest text-white/30">Tap to See Question</span>
                   </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center px-4">
               <button 
                 disabled={currentCardIndex === 0}
                 onClick={prevCard} 
                 className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${currentCardIndex === 0 ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:text-slate-900'}`}
               >
                 ← Previous
               </button>
               <button 
                 onClick={nextCard}
                 disabled={currentCardIndex === (selectedDeck?.questions.length || 0) - 1}
                 className={`px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${currentCardIndex === (selectedDeck?.questions.length || 0) - 1 ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : `${buttonBg} text-white shadow-xl hover:scale-105 active:scale-95`}`}
               >
                 {currentCardIndex === (selectedDeck?.questions.length || 0) - 1 ? 'End of Deck' : 'Next Card →'}
               </button>
            </div>
          </div>
        )}
      </section>

      {/* 3. BOTTOM: Talk Room Lobby */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-stone-200">
        <div className="bg-[#111] text-white rounded-[4rem] p-12 md:p-20 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 transition-transform group-hover:scale-110 duration-1000"></div>
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                 <h3 className="text-5xl font-black tracking-tighter italic mb-6 leading-none">Talk Room Lobby</h3>
                 <p className="text-white/50 font-medium text-lg leading-relaxed max-w-md">
                   Ready to sync with your partner? Enter a shared room for real-time structured dialogue. Requires mutual commitment.
                 </p>
              </div>
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 p-2 rounded-[2.5rem] flex flex-col md:flex-row items-center">
                   <input 
                     type="text" 
                     value={roomCode}
                     onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                     placeholder="ENTER 6-DIGIT CODE"
                     className="flex-1 w-full p-6 bg-transparent outline-none text-white font-black text-center text-xl tracking-[0.4em] placeholder:text-white/10 placeholder:tracking-widest"
                   />
                   <button 
                     onClick={() => setView('room')}
                     className={`w-full md:w-auto px-12 py-6 ${buttonBg} rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm shadow-2xl hover:brightness-110 transition-all`}
                   >
                     Enter Room
                   </button>
                </div>
                <p className="text-center text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">Private &bull; Encrypted &bull; Covenant Centered</p>
              </div>
           </div>
        </div>
      </section>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default Dashboard;
