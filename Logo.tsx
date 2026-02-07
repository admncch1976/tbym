
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  type?: 'tbym' | 'pbym';
}

const TbyMLogo: React.FC<LogoProps> = ({ className, size = 100, type = 'tbym' }) => {
  const isPbym = type === 'pbym';
  
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Logo Text */}
        <div className="text-6xl md:text-7xl font-black tracking-tighter flex items-center">
          <span className={isPbym ? 'text-blue-900' : 'text-[#1A4B58]'}>
            {isPbym ? 'p' : 't'}
          </span>
          <span className="text-slate-300 mx-1">/</span>
          <span className={isPbym ? 'text-red-900' : 'text-[#8B3A4D]'}>M</span>
        </div>
        
        {/* Ring Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`w-[70px] h-[70px] rounded-full border-[3px] ${isPbym ? 'border-blue-400' : 'border-[#D4AF37]'} flex items-center justify-center opacity-60`}>
             <div className={`absolute top-[-4px] w-2.5 h-2.5 ${isPbym ? 'bg-blue-400' : 'bg-[#D4AF37]'} rotate-45`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TbyMLogo;
