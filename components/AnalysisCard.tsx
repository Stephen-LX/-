import React from 'react';
import { GeminiAnalysis } from '../types';

interface AnalysisCardProps {
  analysis: GeminiAnalysis | null;
  loading: boolean;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ analysis, loading }) => {
  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-slate-800/50 rounded-lg border border-slate-700 animate-pulse">
        <div className="h-6 bg-slate-700 rounded w-1/3 mb-4 mx-auto"></div>
        <div className="h-20 bg-slate-700 rounded mb-4"></div>
        <div className="h-10 bg-slate-700 rounded w-1/2 mx-auto"></div>
      </div>
    );
  }

  if (!analysis) return null;

  const sentimentColor = 
    analysis.sentiment === 'Bullish' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-900/10' :
    analysis.sentiment === 'Bearish' ? 'text-red-400 border-red-500/30 bg-red-900/10' :
    analysis.sentiment === 'Volatile' ? 'text-amber-400 border-amber-500/30 bg-amber-900/10' :
    'text-slate-300 border-slate-500/30 bg-slate-900/10';

  return (
    <div className={`w-full max-w-2xl mx-auto mt-8 p-1 rounded-xl bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 shadow-2xl`}>
      <div className="bg-slate-900/90 backdrop-blur-sm p-6 rounded-xl border border-slate-700">
        
        {/* Header: Sentiment & Probability */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b border-slate-700">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-sm uppercase tracking-widest text-slate-400 font-cinzel">Market Sentiment</h3>
            <div className={`text-3xl md:text-4xl font-bold mt-1 px-4 py-2 rounded border ${sentimentColor}`}>
              {analysis.sentiment}
            </div>
          </div>
          <div className="text-center">
             <h3 className="text-sm uppercase tracking-widest text-slate-400 font-cinzel">Probability</h3>
             <div className="relative inline-flex items-center justify-center p-4">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                  <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={226} strokeDashoffset={226 - (226 * analysis.probability) / 100} className={sentimentColor.split(' ')[0]} />
                </svg>
                <span className="absolute text-xl font-bold">{analysis.probability}%</span>
             </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 text-left">
          <div>
            <h4 className="text-amber-500 font-cinzel text-sm mb-1">The Oracle Speaks</h4>
            <p className="text-slate-300 leading-relaxed italic border-l-2 border-amber-500/50 pl-4">
              "{analysis.explanation}"
            </p>
          </div>
          
          <div className="bg-slate-800/50 p-4 rounded border border-slate-700/50">
            <h4 className="text-teal-400 font-cinzel text-sm mb-1">Trader's Guidance</h4>
            <p className="text-slate-200">
              {analysis.advice}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalysisCard;