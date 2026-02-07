
import React, { useState, useEffect, useRef } from 'react';
import { User, Room, Section, Message } from '../types';
// Fixed: Using ADULT_DECKS as the base for room sections as INITIAL_SECTIONS was missing
import { ADULT_DECKS } from '../constants';

interface RoomViewProps {
  user: User;
  onExit: () => void;
}

const RoomView: React.FC<RoomViewProps> = ({ user, onExit }) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'guided' | 'partner' | 'readiness'>('guided');
  const [messageInput, setMessageInput] = useState('');
  // Fixed: Defaulting to 'foundation' which is the first ID in ADULT_DECKS (previously 'ftf')
  const [activeSectionId, setActiveSectionId] = useState('foundation');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rooms = JSON.parse(localStorage.getItem('tbym_rooms') || '[]');
    let currentRoom = rooms.find((r: any) => r.id === user.activeRoomId);
    
    if (currentRoom) {
      if (!currentRoom.sections || currentRoom.sections.length === 0) {
        // Fixed: Initialize room sections with ADULT_DECKS if empty
        currentRoom.sections = ADULT_DECKS;
        localStorage.setItem('tbym_rooms', JSON.stringify(rooms));
      }
      setRoom(currentRoom);
    }
  }, [user.activeRoomId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [room?.messages, activeTab]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !room) return;
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: user.id,
      text: messageInput,
      timestamp: Date.now()
    };
    
    const rooms = JSON.parse(localStorage.getItem('tbym_rooms') || '[]');
    const updatedRooms = rooms.map((r: any) => r.id === room.id ? { ...r, messages: [...r.messages, newMessage] } : r);
    localStorage.setItem('tbym_rooms', JSON.stringify(updatedRooms));
    setRoom({ ...room, messages: [...room.messages, newMessage] });
    setMessageInput('');
  };

  const handleToggleAnswer = (sectionId: string, questionIndex: number) => {
    if (!room) return;
    const isUserA = room.userAId === user.id;
    const rooms = JSON.parse(localStorage.getItem('tbym_rooms') || '[]');
    const updatedRooms = rooms.map((r: any) => {
      if (r.id === room.id) {
        const section = r.sections.find((s: any) => s.id === sectionId);
        if (section) {
          const ansField = isUserA ? 'userAAnswers' : 'userBAnswers';
          const currentAns = [...(section[ansField] || [])];
          currentAns[questionIndex] = !currentAns[questionIndex];
          (section as any)[ansField] = currentAns;

          const bothDone = (section.userAAnswers?.filter(Boolean).length === section.questions.length) &&
                           (section.userBAnswers?.filter(Boolean).length === section.questions.length);
          
          if (bothDone) {
            const nextSecIndex = r.sections.findIndex((s: any) => s.id === sectionId) + 1;
            if (r.sections[nextSecIndex]) r.sections[nextSecIndex].isLocked = false;
          }
        }
      }
      return r;
    });

    localStorage.setItem('tbym_rooms', JSON.stringify(updatedRooms));
    const foundRoom = updatedRooms.find((r: any) => r.id === room.id);
    if (foundRoom) setRoom(foundRoom);
  };

  const toggleCard = (idx: number) => {
    const key = `${activeSectionId}-${idx}`;
    setFlippedCards(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!room) return <div className="p-10 text-center font-black animate-pulse">FINDING ROOM...</div>;

  const partnerId = room.userAId === user.id ? room.userBId : room.userAId;
  const allUsers = JSON.parse(localStorage.getItem('tbym_all_users') || '[]');
  const partnerUser = partnerId ? allUsers.find((u: any) => u.id === partnerId) : null;

  return (
    <div className="flex h-[calc(100vh-120px)] overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-stone-200 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-stone-100">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Themes & Decks</span>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
          {room.sections.map((sec) => (
            <button
              key={sec.id}
              disabled={sec.isLocked}
              onClick={() => setActiveSectionId(sec.id)}
              className={`w-full text-left p-4 rounded-2xl transition group relative overflow-hidden ${
                activeSectionId === sec.id 
                ? 'bg-[#2C5E7A] text-white shadow-lg' 
                : 'bg-white hover:bg-stone-50 text-slate-600'
              } ${sec.isLocked ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest">{sec.title}</p>
                  <p className={`text-[10px] mt-0.5 ${activeSectionId === sec.id ? 'text-white/60' : 'text-slate-400'}`}>
                    {sec.questions.length} Questions
                  </p>
                </div>
                {sec.isLocked && <span className="text-xs">🔒</span>}
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 bg-stone-50 border-t border-stone-200">
           <button onClick={onExit} className="w-full py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition shadow-sm">
             Back to Dashboard
           </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-stone-50 overflow-hidden">
        <div className="flex bg-white border-b border-stone-200 px-4">
          <TabButton active={activeTab === 'guided'} onClick={() => setActiveTab('guided')} label="Decks" />
          <TabButton active={activeTab === 'readiness'} onClick={() => setActiveTab('readiness')} label="Are You Ready?" />
          <TabButton active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} label="Sync Chat" />
          <TabButton active={activeTab === 'partner'} onClick={() => setActiveTab('partner')} label="Partner Status" />
        </div>

        <div className="flex-1 overflow-hidden relative">
          {activeTab === 'guided' && (
            <div className="p-8 h-full overflow-y-auto custom-scrollbar">
              <div className="max-w-5xl mx-auto">
                <div className="mb-12 text-center">
                  <h2 className="text-3xl font-black text-slate-900 italic mb-2">
                    {room.sections.find(s => s.id === activeSectionId)?.title}
                  </h2>
                  <p className="text-slate-400 font-medium">Click a question to see clarification prompts.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {room.sections.find(s => s.id === activeSectionId)?.questions.map((q, idx) => {
                    const section = room.sections.find(s => s.id === activeSectionId);
                    const prompt = section?.prompts[idx] || "Think deeply about your shared future.";
                    const userDone = (room.userAId === user.id ? section?.userAAnswers : section?.userBAnswers)?.[idx];
                    const partnerDone = (room.userAId === user.id ? section?.userBAnswers : section?.userAAnswers)?.[idx];
                    const isFlipped = flippedCards[`${activeSectionId}-${idx}`];

                    return (
                      <div key={idx} className="h-80 perspective-1000 group">
                        <div 
                          className={`relative w-full h-full transition-all duration-500 preserve-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
                          onClick={() => toggleCard(idx)}
                        >
                          {/* Front Face */}
                          <div className="absolute inset-0 backface-hidden bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between group-hover:shadow-xl transition-all">
                             <div>
                               <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-4">Question {idx + 1}</p>
                               <p className="text-xl font-black text-slate-800 leading-snug">{q}</p>
                             </div>
                             <div className="flex justify-between items-center">
                                <div className="flex space-x-4">
                                  <StatusDot active={userDone} color={user.gender === 'Male' ? 'bg-[#2C5E7A]' : 'bg-[#C5A059]'} label="You" />
                                  <StatusDot active={partnerDone} color="bg-slate-300" label="Partner" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tap to Flip</span>
                             </div>
                          </div>

                          {/* Back Face */}
                          <div className="absolute inset-0 backface-hidden bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-between rotate-y-180 text-white">
                             <div>
                               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Prompts & Context</p>
                               <p className="text-base font-medium leading-relaxed italic text-white/90">"{prompt}"</p>
                             </div>
                             <button 
                               onClick={(e) => { e.stopPropagation(); handleToggleAnswer(activeSectionId, idx); }}
                               className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg transition-all ${
                                 userDone ? 'bg-white text-slate-900' : 'bg-slate-700 text-white hover:bg-slate-600'
                               }`}
                             >
                               {userDone ? '✓ Completed' : 'Mark as Discussed'}
                             </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'readiness' && (
            <div className="p-8 h-full overflow-y-auto custom-scrollbar flex items-center justify-center">
              <div className="max-w-xl w-full bg-white p-12 rounded-[3rem] shadow-xl text-center border border-slate-100">
                 <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter italic">Covenant Readiness</h2>
                 <p className="text-slate-400 mb-10 leading-relaxed">This module allows you to sync your personal readiness scores with your partner's scores.</p>
                 <div className="bg-stone-50 p-6 rounded-2xl border-l-4 border-slate-900 text-left mb-8">
                    <p className="text-sm font-bold text-slate-700">"Am I preparing to be a godly spouse, or am I simply looking for one?"</p>
                 </div>
                 <button 
                    onClick={() => setActiveTab('partner')}
                    className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition shadow-xl"
                  >
                    View Partner Index
                  </button>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="flex flex-col h-full bg-stone-100">
              <div className="flex-1 p-8 overflow-y-auto custom-scrollbar space-y-6">
                {room.messages.map(m => (
                  <div key={m.id} className={`flex ${m.senderId === user.id ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-md p-6 rounded-[2rem] text-sm ${m.senderId === user.id ? 'bg-[#2C5E7A] text-white rounded-br-none shadow-lg shadow-[#2C5E7A]/20' : 'bg-white text-slate-800 rounded-bl-none border border-stone-200 shadow-sm'}`}>
                      <p className="font-medium leading-relaxed">{m.text}</p>
                      <p className="text-[10px] mt-2 opacity-50 font-black">{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef}></div>
              </div>
              <div className="p-6 bg-white border-t border-stone-200 flex space-x-4">
                <input 
                  type="text" 
                  className="flex-1 p-5 bg-stone-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-slate-300 font-bold"
                  placeholder="Sync thoughts..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage} className="bg-slate-900 text-white px-10 rounded-2xl font-black uppercase tracking-widest">Send</button>
              </div>
            </div>
          )}

          {activeTab === 'partner' && (
            <div className="p-10 flex flex-col items-center justify-center h-full">
               {partnerUser ? (
                  <div className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 text-center">
                    <div className="w-24 h-24 bg-stone-50 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl shadow-inner border border-white">
                      {partnerUser.firstName[0]}
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-1 italic">{partnerUser.firstName}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">{partnerUser.age} &bull; {partnerUser.gender}</p>
                    <div className="space-y-4 text-left border-t pt-8">
                       <ScoreRow label="Ready Index" value={partnerUser.scores?.total || 0} isPercent />
                       <ScoreRow label="Conflict Handle" value={partnerUser.scores?.conflict || 0} />
                       <ScoreRow label="Spiritual Root" value={partnerUser.scores?.spiritual || 0} />
                    </div>
                  </div>
               ) : (
                  <div className="text-center text-slate-300 space-y-4">
                    <div className="text-6xl animate-bounce">💍</div>
                    <p className="text-xl font-bold">Waiting for Partner to Join...</p>
                    <p className="text-sm font-black uppercase tracking-[0.4em] bg-white px-6 py-2 rounded-full shadow-sm text-slate-900">{room.code}</p>
                  </div>
               )}
            </div>
          )}
        </div>
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

const TabButton = ({ active, onClick, label }: any) => (
  <button onClick={onClick} className={`px-10 py-5 text-[10px] font-black uppercase tracking-[0.3em] border-b-4 transition-all ${active ? 'border-[#2C5E7A] text-[#2C5E7A] bg-stone-50' : 'border-transparent text-slate-300 hover:text-slate-500'}`}>
    {label}
  </button>
);

const StatusDot = ({ active, color, label }: any) => (
  <div className="flex items-center space-x-2">
    <div className={`w-2.5 h-2.5 rounded-full ${active ? color : 'bg-stone-100'}`}></div>
    <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-slate-900' : 'text-slate-300'}`}>{label}</span>
  </div>
);

const ScoreRow = ({ label, value, isPercent }: any) => (
  <div className="flex justify-between items-center">
    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
    <span className={`font-black ${isPercent ? 'text-2xl text-[#2C5E7A]' : 'text-slate-900'}`}>{value}{isPercent ? '%' : '/10'}</span>
  </div>
);

export default RoomView;
