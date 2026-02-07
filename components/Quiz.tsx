
import React, { useState } from 'react';
import { User, UserGender, ReadinessScore } from '../types';
import { READINESS_QUIZ_YOUNGER, READINESS_QUIZ_ADULT } from '../constants';

interface QuizProps {
  user: User;
  onComplete: (scores: { total: number; breakdown: ReadinessScore[] }) => void;
}

const Quiz: React.FC<QuizProps> = ({ user, onComplete }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  
  const isPrep = user.isPreparationMode;
  const questions = isPrep ? READINESS_QUIZ_YOUNGER : READINESS_QUIZ_ADULT;
  const currentIdx = Object.keys(answers).length;

  const handleAnswer = (val: number) => {
    const q = questions[currentIdx];
    setAnswers({ ...answers, [q.id]: val });
  };

  const finish = () => {
    const totalPossible = questions.length * 5;
    // Fix for line 25 & 26: Cast Object.values(answers) to number[] to resolve 'unknown' type errors in reduce and division.
    const currentTotal = (Object.values(answers) as number[]).reduce((a: number, b: number) => a + b, 0);
    const totalScore = Math.round((currentTotal / totalPossible) * 100);

    const breakdown: ReadinessScore[] = questions.map(q => ({
      label: q.category,
      score: answers[q.id]
    }));

    onComplete({ total: totalScore, breakdown });
  };

  const isMale = user.gender === UserGender.MALE;
  const accentColor = isMale ? 'text-[#2C5E7A]' : 'text-pink-600';
  const progressBg = isMale ? 'bg-[#2C5E7A]' : 'bg-pink-600';

  if (currentIdx >= questions.length) {
    return (
      <div className="max-w-2xl mx-auto p-12 mt-20 bg-white rounded-[4rem] shadow-xl text-center border border-slate-100">
         <h2 className="text-3xl font-black text-slate-900 mb-6 italic">Assessment Complete</h2>
         <p className="text-slate-400 mb-10">Your discernment profile has been calculated based on your honest responses.</p>
         <button onClick={finish} className={`px-12 py-5 rounded-2xl text-white font-black uppercase tracking-widest shadow-xl ${progressBg}`}>See Results</button>
      </div>
    );
  }

  const currentQ = questions[currentIdx];

  return (
    <div className="max-w-2xl mx-auto pt-20 px-6">
      <div className="mb-10 flex justify-between items-end">
         <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">{currentQ.category}</p>
            <h2 className="text-2xl font-black text-slate-900 italic tracking-tight leading-snug">{currentQ.text}</h2>
         </div>
         <span className="text-[10px] font-black text-slate-300 uppercase whitespace-nowrap">{currentIdx + 1} / {questions.length}</span>
      </div>

      <div className="h-2 bg-stone-100 rounded-full mb-12 overflow-hidden">
         <div className={`h-full transition-all duration-500 ${progressBg}`} style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}></div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map(v => (
          <button 
            key={v}
            onClick={() => handleAnswer(v)}
            className="group flex flex-col items-center"
          >
            <div className={`w-16 h-16 rounded-[1.5rem] border-2 border-stone-100 flex items-center justify-center text-xl font-black transition-all hover:scale-110 hover:shadow-lg hover:border-slate-900 ${answers[currentQ.id] === v ? 'bg-slate-900 text-white' : 'bg-white text-slate-400'}`}>
              {v}
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-300 mt-4 group-hover:text-slate-900">{v === 1 ? 'Strongly Disagree' : v === 5 ? 'Strongly Agree' : ''}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
