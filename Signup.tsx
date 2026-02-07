
import React, { useState } from 'react';
import { User, UserGender, Intention } from '../types';

interface SignupProps {
  onSwitch: () => void;
  onSuccess: (user: User) => void;
}

const Signup: React.FC<SignupProps> = ({ onSwitch, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
    gender: UserGender.MALE,
    age: 18,
    acceptedTerms: false
  });
  const [error, setError] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.password || !formData.acceptedTerms) {
      setError('Fill all fields & accept terms.');
      return;
    }

    // Updated thresholds: Men < 24, Women < 21
    const isPrep = (formData.gender === UserGender.MALE && formData.age < 24) ||
                   (formData.gender === UserGender.FEMALE && formData.age < 21);

    const newUser: User & {password: string} = {
      id: Math.random().toString(36).substr(2, 9),
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      gender: formData.gender,
      age: formData.age,
      intention: Intention.NOT_SURE,
      isPreparationMode: isPrep,
      isAdmin: false
    };

    const existingUsers = JSON.parse(localStorage.getItem('tbym_all_users') || '[]');
    localStorage.setItem('tbym_all_users', JSON.stringify([...existingUsers, newUser]));

    onSuccess(newUser);
  };

  const isMale = formData.gender === UserGender.MALE;
  const accentColor = isMale ? 'teal' : 'pink';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-pink-50 p-4">
      <div className="max-w-lg w-full bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-14 border border-white">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 mb-2 italic">Join t/M</h1>
          <p className="text-slate-400 font-medium uppercase tracking-[0.2em] text-[10px]">Real Talk &bull; No Bakwas</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-[10px] font-black uppercase tracking-[0.2em] text-${accentColor}-600 mb-2`}>First Name</label>
              <input 
                type="text" 
                className={`w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-${accentColor}-400 outline-none transition-all font-bold`}
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div>
              <label className={`block text-[10px] font-black uppercase tracking-[0.2em] text-${accentColor}-600 mb-2`}>Age</label>
              <input 
                type="number" 
                className={`w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-${accentColor}-400 outline-none transition-all font-bold`}
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div>
            <label className={`block text-[10px] font-black uppercase tracking-[0.2em] text-${accentColor}-600 mb-2`}>I am a...</label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setFormData({...formData, gender: UserGender.MALE})}
                className={`p-4 rounded-2xl border-2 font-black transition-all ${isMale ? 'bg-teal-600 border-teal-600 text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
              >
                Man
              </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, gender: UserGender.FEMALE})}
                className={`p-4 rounded-2xl border-2 font-black transition-all ${!isMale ? 'bg-pink-600 border-pink-600 text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
              >
                Woman
              </button>
            </div>
          </div>

          <div>
            <label className={`block text-[10px] font-black uppercase tracking-[0.2em] text-${accentColor}-600 mb-2`}>Email</label>
            <input 
              type="email" 
              className={`w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-${accentColor}-400 outline-none transition-all font-bold`}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className={`block text-[10px] font-black uppercase tracking-[0.2em] text-${accentColor}-600 mb-2`}>Password</label>
            <input 
              type="password" 
              className={`w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-${accentColor}-400 outline-none transition-all font-bold`}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className="flex items-start space-x-3 py-2 text-left">
            <input 
              type="checkbox" 
              className={`w-5 h-5 rounded border-2 border-slate-200 mt-1 cursor-pointer`}
              checked={formData.acceptedTerms}
              onChange={(e) => setFormData({...formData, acceptedTerms: e.target.checked})}
            />
            <span className="text-xs text-slate-400 font-medium leading-tight">
              I agree to the t/M Terms. This is for serious pre-marital discernment only.
            </span>
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center italic">{error}</p>}

          <button 
            type="submit" 
            className={`w-full ${isMale ? 'bg-teal-600 shadow-teal-100' : 'bg-pink-600 shadow-pink-100'} text-white p-5 rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition shadow-xl`}
          >
            Join t/M
          </button>
        </form>

        <div className="mt-8 text-center">
          <button onClick={onSwitch} className="text-slate-400 font-bold hover:text-slate-600 transition text-sm">Already have an account? Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
