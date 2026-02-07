
import React, { useState } from 'react';
import { User, UserGender } from '../types';
import { YOUNGER_DECKS } from '../constants';
import TbyMLogo from './Logo';

interface PreparationModeProps {
  user: User;
  onRegister: () => void;
  onNavigate: (v: any) => void;
}

const PREP_QUIZ_QUESTIONS = [
  { 
    id: 1, 
    text: "When will you finish your Undergraduate degree?", 
    category: "Education",
    options: ["Already Finished / Within 1 year", "I still have 2+ years left"]
  },
  { 
    id: 2, 
    text: "By when do you want to get married?", 
    category: "Vision",
    options: ["Ideally within 1-2 years", "Not for at least 3-4 years"]
  },
  { 
    id: 3, 
    text: "Do you have a clear plan for what comes next?", 
    category: "Stability",
    options: ["Yes, my plan is mapped out", "I'm still figuring things out"]
  },
  { 
    id: 4, 
    text: "Can you tell your parents about arranging a wedding in the next 6 months?", 
    category: "Family",
    options: ["Yes, I am ready to speak to them", "No, not ready for that talk"]
  },
  { 
    id: 5, 
    text: "Do you have a consistent personal savings or budgeting habit?", 
    category: "Stewardship",
    options: ["Yes, I save monthly", "Not yet, still dependent"]
  }
];

const PreparationMode: React.FC<PreparationModeProps> = ({ user, onNavigate }) => {
  const [viewState, setViewState] = useState<'main' | 'deck' | 'quiz'>('main');
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [markers, setMarkers] = useState<string[]>(["Consistent Prayer Life"]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [currentQuizStep, setCurrentQuizStep] = useState(0);

  // p/M Theme: Maroon and Blue
  const maroon = 'text-red-900';
  const maroonBg = 'bg-red-900';
  const deepBlue = 'text-blue-900';
  const blueBg = 'bg-blue-900';

  const selectedDeck = YOUNGER_DECKS.find(d => d.id === selectedDeckId);

  const handleStartQuiz = () => {
    setViewState('quiz');
    setCurrentQuizStep(0);
    setQuizAnswers({});
  };

  const handleQuizAnswer = (optionIdx: number) => {
    const updatedAnswers = { ...quizAnswers, [PREP_QUIZ_QUESTIONS[currentQuizStep].id]: optionIdx };
    setQuizAnswers(updatedAnswers);

    if (currentQuizStep < PREP_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizStep(currentQuizStep + 1);
    } else {
      const readyCount = Object.values(updatedAnswers).filter(val => val === 0).length;
      if (readyCount >= 4) {
        setMarkers(prev => Array.from(new Set([...prev, "Foundational Readiness Marker", "Vision Clarity"])));
      } else {
        setMarkers(prev => Array.from(new Set([...prev, "Growth in Progress"])));
      }
      setViewState('main');
    }
  };

  const nextCard = () => {
    if (selectedDeck && currentCardIndex < selectedDeck.questions.length - 1) {
      setFlipped(false);
      setTimeout(() => setCurrentCardIndex(currentCardIndex + 1), 150);
    }
  };

  if (viewState === 'quiz') {
    const q = PREP_QUIZ_QUESTIONS[currentQuizStep];
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white p-10 md:p-16 rounded-[3.5rem] shadow-2xl border border-stone-100 text-center animate-in zoom-in duration-300">
          <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${maroon} mb-4`}>Step {currentQuizStep + 1} of {PREP_QUIZ_QUESTIONS.length}</p>
          <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-2">{q.category}</p>
          <h2 className={`text-3xl font-black italic ${deepBlue} mb-12 leading-tight`}>"{q.text}"</h2>
          <div className="grid grid-cols-1 gap-4">
            {q.options.map((opt, idx) => (
              <button 
                key={idx}
                onClick={() => handleQuizAnswer(idx)}
                className={`w-full p-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg border-2 ${
                  idx === 0 
                  ? `bg-white border-blue-900 text-blue-900 hover:bg-blue-50` 
                  : `bg-stone-50 border-stone-100 text-slate-400 hover:bg-stone-100`
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          <button onClick={() => setViewState('main')} className="mt-12 text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-slate-600">Cancel Quiz</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      <section className="bg-white border-b border-blue-50 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center space-x-8">
            <div className={`w-24 h-24 rounded-full border-8 border-stone-50 flex items-center justify-center ${deepBlue}`}>
              <span className="text-2xl font-black">{user.scores?.total || 0}%</span>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <TbyMLogo type="pbym" size={16} className="scale-50 origin-left" />
                <h2 className={`text-[10px] font-black uppercase tracking-widest ${maroon}`}>Preparation Index</h2>
              </div>
              <p className="text-3xl font-black italic text-slate-900 tracking-tight">Prepare Before You Marry.</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Foundation Module &bull; Growth Stage</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleStartQuiz}
              className={`${blueBg} text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl hover:scale-105 active:scale-95 transition-all shadow-blue-100 flex items-center space-x-2`}
            >
              <span>Built Marker Quiz</span>
              <span className="opacity-50">✨</span>
            </button>
            <button 
              onClick={() => onNavigate('quiz')}
              className={`border-2 border-red-900 ${maroon} px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-50 transition-all`}
            >
              Readiness Check
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-4">
           <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-blue-100/50 border border-white relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-32 h-32 ${blueBg} opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700`}></div>
              <h3 className={`text-xl font-black italic mb-2 leading-tight ${deepBlue}`}>Your Preparedness Markers</h3>
              <p className="text-xs text-slate-400 mb-8 font-medium">Earn markers by completing foundation assessments.</p>
              
              <div className="space-y-4">
                 {markers.map((m, i) => (
                   <div key={i} className="flex items-center space-x-4 p-5 bg-stone-50 rounded-2xl border border-stone-100 transition-all hover:bg-white hover:border-red-100">
                      <div className={`w-3 h-3 rounded-full ${maroonBg}`}></div>
                      <p className="text-xs font-bold text-slate-700">{m}</p>
                   </div>
                 ))}
              </div>
           </div>
        </aside>

        <main className="lg:col-span-8">
          {viewState === 'main' && !selectedDeckId ? (
            <div className="space-y-8">
               <h3 className={`text-xs font-black uppercase tracking-[0.4em] ${deepBlue}`}>Foundation Decks</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {YOUNGER_DECKS.map((deck) => (
                   <div 
                     key={deck.id} 
                     onClick={() => { setSelectedDeckId(deck.id); setViewState('deck'); setCurrentCardIndex(0); setFlipped(false); }}
                     className="bg-white p-10 rounded-[3.5rem] border border-white shadow-xl shadow-stone-200/40 hover:shadow-2xl transition-all cursor-pointer h-80 flex flex-col justify-between group relative overflow-hidden"
                   >
                     <div className={`absolute top-0 left-0 w-2 h-full ${maroonBg} opacity-10 group-hover:opacity-100 transition-all`}></div>
                     <span className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">{deck.icon}</span>
                     <div>
                       <h3 className={`text-2xl font-black text-slate-900 group-hover:${maroon} transition-all`}>{deck.title}</h3>
                       <p className="text-xs text-slate-400 font-medium mt-1 leading-relaxed">{deck.description}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          ) : viewState === 'deck' && selectedDeck ? (
            <div className="space-y-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4">
              <div className="flex justify-between items-center">
                 <button onClick={() => { setSelectedDeckId(null); setViewState('main'); }} className="text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-red-900">← Exit Deck</button>
                 <div className="flex items-center space-x-3">
                   <span className="text-2xl">{selectedDeck.icon}</span>
                   <h3 className={`text-xl font-black italic ${deepBlue}`}>{selectedDeck.title}</h3>
                 </div>
                 <span className="text-xs font-bold text-slate-300">{currentCardIndex + 1} / {selectedDeck.questions.length}</span>
              </div>
              
              <div className="h-96 perspective-1000">
                <div className={`relative w-full h-full transition-all duration-700 preserve-3d cursor-pointer ${flipped ? 'rotate-y-180' : ''}`} onClick={() => setFlipped(!flipped)}>
                  <div className="absolute inset-0 backface-hidden bg-white border border-stone-100 rounded-[3.5rem] p-12 flex flex-col justify-center text-center shadow-2xl">
                     <p className={`text-[10px] font-black uppercase tracking-widest ${maroon} opacity-30 mb-8`}>Reflection</p>
                     <p className="text-3xl font-black text-slate-800 leading-tight italic">"{selectedDeck.questions[currentCardIndex]}"</p>
                  </div>
                  <div className={`absolute inset-0 backface-hidden ${maroonBg} rounded-[3.5rem] p-12 flex flex-col justify-center text-center rotate-y-180 text-white shadow-2xl`}>
                     <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-8">Guided Insight</p>
                     <p className="text-xl font-medium italic opacity-90 leading-relaxed">"{selectedDeck.prompts[currentCardIndex][0]}"</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button 
                   onClick={(e) => { e.stopPropagation(); nextCard(); }}
                   disabled={currentCardIndex === selectedDeck.questions.length - 1}
                   className={`px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl transition-all ${currentCardIndex === selectedDeck.questions.length - 1 ? 'bg-slate-100 text-slate-300' : `${blueBg} text-white hover:scale-105 active:scale-95 shadow-blue-100`}`}
                >
                   {currentCardIndex === selectedDeck.questions.length - 1 ? 'Deck Complete' : 'Next Question →'}
                </button>
              </div>
            </div>
          ) : null}
        </main>
      </div>
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default PreparationMode;
