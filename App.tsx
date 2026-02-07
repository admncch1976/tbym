
import React, { useState, useEffect } from 'react';
import { User, Room, UserGender, Intention } from './types';
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import PreparationMode from './components/PreparationMode';
import RoomView from './components/RoomView';
import AdminPanel from './components/AdminPanel';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'landing' | 'login' | 'signup' | 'dashboard' | 'quiz' | 'room' | 'admin' | 'prep'>('landing');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('tbym_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      if (parsedUser.isAdmin) setView('admin');
      else if (parsedUser.isPreparationMode) setView('prep');
      else if (!parsedUser.scores && !parsedUser.isGuest) setView('quiz');
      else setView('dashboard');
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('tbym_user');
    setUser(null);
    setView('landing');
  };

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    localStorage.setItem('tbym_user', JSON.stringify(userData));
    
    if (userData.isAdmin) setView('admin');
    else if (userData.isPreparationMode) setView('prep');
    else if (!userData.scores && !userData.isGuest) setView('quiz');
    else setView('dashboard');
  };

  const handleQuickStart = (data: { firstName: string; age: number; gender: UserGender }) => {
    // Thresholds: Men < 24, Women < 21
    const isPrep = (data.gender === UserGender.MALE && data.age < 24) || 
                   (data.gender === UserGender.FEMALE && data.age < 21);

    const guestUser: User = {
      id: 'guest-' + Math.random().toString(36).substr(2, 5),
      email: '',
      firstName: data.firstName,
      gender: data.gender,
      age: data.age,
      intention: Intention.EXPLORING,
      isPreparationMode: isPrep,
      isAdmin: false,
      isGuest: true
    };
    
    handleAuthSuccess(guestUser);
  };

  const updateUserData = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('tbym_user', JSON.stringify(updatedUser));
  };

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col font-['Inter'] bg-stone-50">
      {user && <Navbar user={user} onLogout={handleLogout} onNavigate={setView} />}
      
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        {view === 'landing' && <Landing onQuickStart={handleQuickStart} onNavigateLogin={() => setView('login')} />}
        {view === 'login' && <Login onSwitch={() => setView('signup')} onSuccess={handleAuthSuccess} />}
        {view === 'signup' && <Signup onSwitch={() => setView('login')} onSuccess={handleAuthSuccess} />}
        
        {user && (
          <>
            {view === 'dashboard' && <Dashboard user={user} setView={setView} updateUserData={updateUserData} onRegister={() => setView('signup')} />}
            {view === 'quiz' && <Quiz user={user} onComplete={(scores) => {
              updateUserData({ scores, isGuest: false });
              setView(user.isPreparationMode ? 'prep' : 'dashboard');
            }} />}
            {view === 'prep' && <PreparationMode user={user} onRegister={() => setView('signup')} onNavigate={setView} />}
            {view === 'room' && <RoomView user={user} onExit={() => setView('dashboard')} />}
            {view === 'admin' && <AdminPanel />}
          </>
        )}
      </main>

      <footer className="py-6 text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.4em] border-t border-slate-100 bg-white">
        {user?.isPreparationMode ? 'p/M • PREPARE FIRST • THEN DISCERN' : 't/M • REAL TALK • NO BAKWAS'}
      </footer>
    </div>
  );
};

export default App;
