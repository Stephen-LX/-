import React from 'react';
import { SixRenType } from '../types';
import { SIX_REN_ORDER, SIX_REN_DETAILS } from '../constants';

interface OracleWheelProps {
  activeResult: SixRenType | null;
  isSpinning: boolean;
}

const OracleWheel: React.FC<OracleWheelProps> = ({ activeResult, isSpinning }) => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto my-8">
      {/* Outer Glow Ring */}
      <div className={`absolute inset-0 rounded-full border-2 border-slate-700 ${isSpinning ? 'animate-pulse' : ''}`}></div>
      
      {/* Center Hub */}
      <div className="absolute inset-0 m-auto w-24 h-24 bg-slate-900 rounded-full border border-slate-600 flex items-center justify-center z-20 shadow-xl">
        <div className="text-center">
            <span className="block text-2xl">☯</span>
            <span className="text-xs text-slate-400 font-cinzel">ORACLE</span>
        </div>
      </div>

      {/* Segments */}
      {SIX_REN_ORDER.map((ren, index) => {
        const details = SIX_REN_DETAILS[ren];
        const isActive = activeResult === ren;
        
        // Calculate position in circle
        const angle = (index * 60) - 90; // -90 to start at top
        const radius = 100; // Distance from center
        // Using simple trig for positioning dots/labels
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <div 
            key={ren}
            className={`absolute w-24 h-24 flex flex-col items-center justify-center transition-all duration-500`}
            style={{
              top: `50%`,
              left: `50%`,
              marginTop: -48, // half of height
              marginLeft: -48, // half of width
              transform: `translate(${x}px, ${y}px)`
            }}
          >
            <div 
              className={`
                flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 
                transition-all duration-300
                ${isActive 
                  ? `${details.color} border-current bg-white/10 shadow-[0_0_15px_currentColor] scale-125` 
                  : 'text-slate-600 border-slate-700 bg-slate-800/50 scale-100 opacity-60'
                }
              `}
            >
              <span className="text-lg font-bold">{details.cn}</span>
              <span className="text-[0.6rem] uppercase font-cinzel tracking-wider">{ren}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OracleWheel;