import React, { useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { calculateXiaoLiuRen } from './utils/calculator';
import { getGeminiAnalysis } from './services/geminiService';
import { DivinationResult, GeminiAnalysis } from './types';
import OracleWheel from './components/OracleWheel';
import AnalysisCard from './components/AnalysisCard';
import { SIX_REN_DETAILS } from './constants';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 16));
  const [result, setResult] = useState<DivinationResult | null>(null);
  const [analysis, setAnalysis] = useState<GeminiAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Core divination logic
  const handleDivination = useCallback(async () => {
    if (!selectedDate) return;

    setLoading(true);
    setResult(null);
    setAnalysis(null);
    setError(null);

    try {
      // 1. Calculate Xiao Liu Ren Result
      const dateObj = new Date(selectedDate);
      const calcResult = calculateXiaoLiuRen(dateObj);
      
      // Artificial delay for "mystical" effect (spinning wheel)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setResult(calcResult);

      // 2. Get AI Interpretation
      const aiAnalysis = await getGeminiAnalysis(calcResult);
      setAnalysis(aiAnalysis);

    } catch (err) {
      console.error(err);
      setError("The stars are clouded. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  // Handler for current time button
  const setNow = () => {
    const now = new Date();
    // Offset for local timezone in ISO string for datetime-local input
    const offset = now.getTimezoneOffset() * 60000; 
    const localIso = new Date(now.getTime() - offset).toISOString().slice(0, 16);
    setSelectedDate(localIso);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col items-center pb-20">
      
      {/* Header */}
      <header className="w-full py-8 text-center bg-gradient-to-b from-slate-900 to-[#0f172a] border-b border-slate-800">
        <h1 className="text-3xl md:text-5xl font-bold font-cinzel text-amber-500 tracking-wider mb-2">
          小六壬 Market Oracle
        </h1>
        <p className="text-slate-400 text-sm md:text-base font-light">
          Predict market movements via Ancient Algorithms
        </p>
      </header>

      {/* Main Controls */}
      <main className="w-full max-w-4xl px-4 mt-8 flex flex-col items-center">
        
        {/* Input Section */}
        <div className="w-full max-w-md flex flex-col md:flex-row gap-4 items-center bg-slate-800/30 p-4 rounded-xl border border-slate-700 backdrop-blur">
          <div className="flex flex-col items-start w-full">
            <label className="text-xs text-slate-400 mb-1 ml-1 uppercase tracking-wide">
              Prediction Time / Backtest Date
            </label>
            <div className="flex w-full gap-2">
              <input 
                type="datetime-local" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="flex-grow bg-slate-900 border border-slate-600 rounded px-4 py-2 text-slate-100 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono text-sm"
              />
            </div>
          </div>
          
          <button 
            onClick={setNow}
            className="whitespace-nowrap px-3 py-2 text-xs border border-amber-500/30 text-amber-500 rounded hover:bg-amber-500/10 transition-colors"
          >
            Set Now
          </button>
        </div>

        <button
          onClick={handleDivination}
          disabled={loading}
          className={`
            mt-6 px-12 py-3 rounded-full text-lg font-bold tracking-widest font-cinzel
            transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)]
            ${loading 
              ? 'bg-slate-700 text-slate-500 cursor-wait' 
              : 'bg-gradient-to-r from-amber-600 to-amber-500 text-white hover:scale-105 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]'
            }
          `}
        >
          {loading ? 'DIVINING...' : 'REVEAL DESTINY'}
        </button>

        {error && (
          <div className="mt-4 text-red-400 bg-red-900/20 px-4 py-2 rounded border border-red-900">
            {error}
          </div>
        )}

        {/* Visualization */}
        <OracleWheel 
          activeResult={result?.result || null} 
          isSpinning={loading}
        />

        {/* Result Details Text */}
        {result && !loading && (
          <div className="text-center animate-fade-in-up w-full">
            <h2 className={`text-5xl font-bold mb-2 ${SIX_REN_DETAILS[result.result].color}`}>
              {result.result}
            </h2>
            <div className="text-slate-400 mb-6 font-cinzel text-lg">
              {SIX_REN_DETAILS[result.result].cn}
            </div>

            {/* The 3-Step Path Display */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-8">
               {/* Month */}
               <div className="flex flex-col items-center p-3 rounded bg-slate-800/40 border border-slate-700 w-32">
                  <span className="text-[10px] uppercase tracking-widest text-slate-500">Month (Root)</span>
                  <span className={`font-bold ${SIX_REN_DETAILS[result.monthRen].color}`}>{result.monthRen}</span>
                  <span className="text-xs text-slate-400">{SIX_REN_DETAILS[result.monthRen].cn}</span>
               </div>
               
               <div className="hidden md:block text-slate-600">→</div>
               <div className="block md:hidden text-slate-600">↓</div>

               {/* Day */}
               <div className="flex flex-col items-center p-3 rounded bg-slate-800/40 border border-slate-700 w-32">
                  <span className="text-[10px] uppercase tracking-widest text-slate-500">Day (Trunk)</span>
                  <span className={`font-bold ${SIX_REN_DETAILS[result.dayRen].color}`}>{result.dayRen}</span>
                  <span className="text-xs text-slate-400">{SIX_REN_DETAILS[result.dayRen].cn}</span>
               </div>

               <div className="hidden md:block text-slate-600">→</div>
               <div className="block md:hidden text-slate-600">↓</div>

               {/* Hour */}
               <div className="flex flex-col items-center p-3 rounded bg-slate-800/80 border border-amber-500/30 w-32 shadow-[0_0_10px_rgba(0,0,0,0.3)]">
                  <span className="text-[10px] uppercase tracking-widest text-amber-500">Hour (Result)</span>
                  <span className={`font-bold ${SIX_REN_DETAILS[result.timeRen].color}`}>{result.timeRen}</span>
                  <span className="text-xs text-slate-400">{SIX_REN_DETAILS[result.timeRen].cn}</span>
               </div>
            </div>
            
            <div className="text-xs text-slate-500 font-mono mb-2">
              Values: M{result.lunarMonth} + D{result.lunarDay} + H({result.timeZhi})
            </div>
          </div>
        )}

        {/* AI Analysis */}
        <AnalysisCard analysis={analysis} loading={loading} />

      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-slate-600 text-xs">
        <p>This is for entertainment purposes only. Not financial advice.</p>
        <p className="mt-1">Powered by Gemini 2.5 Flash</p>
      </footer>
    </div>
  );
};

export default App;