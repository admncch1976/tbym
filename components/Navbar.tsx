
import React from 'react';
import { User, UserGender } from '../types';
import TbyMLogo from './Logo';

interface NavbarProps {
  user: User;
  onLogout: () => void;
  onNavigate: (view: any) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onNavigate }) => {
  const isPrep = user.isPreparationMode;
  const brandTitle = isPrep ? 'p/M' : 'TbyM';
  const tagline = isPrep ? 'Prepare Before You Marry' : 'Talk Before You Marry';

  return (
    <nav className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div 
        className="flex items-center space-x-3 cursor-pointer group" 
        onClick={() => onNavigate(isPrep ? 'prep' : 'dashboard')}
      >
        <div className="scale-75 md:scale-90 origin-left">
          <TbyMLogo type={isPrep ? 'pbym' : 'tbym'} size={32} className="group-hover:scale-105 transition-transform" />
        </div>
        <div className="flex flex-col">
          <span className={`text-xl font-black tracking-tighter leading-none ${isPrep ? 'text-blue-900' : 'text-slate-900'}`}>
            {brandTitle}
          </span>
          <span className="hidden md:block text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">
            {tagline}
          </span>
        </div>
      </div>
      
      <div className="flex items-center space-x-8 text-xs font-black uppercase tracking-widest text-slate-400">
        {!user.isAdmin && (
          <button 
            onClick={() => onNavigate(isPrep ? 'prep' : 'dashboard')} 
            className={`hover:text-slate-900 transition-colors ${isPrep ? 'hover:text-red-900 font-black' : ''}`}
          >
            Dashboard
          </button>
        )}
        {user.isAdmin && (
          <button 
            onClick={() => onNavigate('admin')} 
            className="hover:text-slate-900 transition-colors"
          >
            Admin Panel
          </button>
        )}
        <button 
          onClick={onLogout} 
          className={`${isPrep ? 'bg-red-900' : 'bg-slate-900'} text-white px-5 py-2.5 rounded-xl hover:scale-105 transition active:scale-95 shadow-lg shadow-slate-200`}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
