
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { QuantumDiagnostics } from '../types';

const INTEGRITY_THRESHOLD = 98.0;
const DECAY_THRESHOLD = 0.15;

export const QuantumEncryptionDiagnostics: React.FC = () => {
  const [diagData, setDiagData] = useState<any[]>([]);
  const [current, setCurrent] = useState<QuantumDiagnostics>({
    keyStrength: 8192,
    entanglementDecay: 0.042,
    noiseLevel: 0.12,
    activeVulnerabilities: ["Coherence Drift", "Phase Shift Noise"],
    integrityScore: 99.85
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Mock data adjusted to occasionally breach thresholds
      const decayVal = parseFloat((Math.random() * 0.2).toFixed(3));
      const integrityVal = parseFloat((97.0 + Math.random() * 3.0).toFixed(2));
      
      setDiagData(prev => [...prev.slice(-20), { time: Date.now(), value: decayVal }]);
      
      setCurrent(prev => ({
        ...prev,
        entanglementDecay: decayVal,
        integrityScore: integrityVal,
        keyStrength: 8192 + (Math.random() > 0.95 ? (Math.random() > 0.5 ? 1 : -1) : 0)
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const isCriticalIntegrity = current.integrityScore < INTEGRITY_THRESHOLD;
  const isCriticalDecay = current.entanglementDecay > DECAY_THRESHOLD;
  const isAlert = isCriticalIntegrity || isCriticalDecay;

  return (
    <div className={`transition-all duration-300 rounded-lg p-4 flex flex-col h-full backdrop-blur-md relative overflow-hidden border ${
      isAlert ? 'animate-cyber-flash border-rose-500' : 'bg-slate-900/60 border-emerald-500/30'
    }`}>
      {/* Alert Banner */}
      {isAlert && (
        <div className="absolute top-0 left-0 w-full bg-rose-600 text-white text-[9px] font-bold py-1 px-3 flex justify-between items-center z-20 animate-pulse">
          <div className="flex items-center gap-2">
            <span className="animate-ping w-1.5 h-1.5 bg-white rounded-full" />
            CRITICAL_INSTABILITY_DETECTED
          </div>
          <div className="font-mono">
            {isCriticalIntegrity && "INTG_BREACH "}
            {isCriticalDecay && "DECAY_OVERFLOW"}
          </div>
        </div>
      )}

      <div className={`absolute top-0 right-0 p-2 opacity-10 transition-colors duration-500 ${isAlert ? 'text-rose-500' : 'text-emerald-500'}`}>
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      <div className={`flex justify-between items-center mb-4 border-b pb-2 transition-colors ${isAlert ? 'border-rose-500/30 mt-4' : 'border-emerald-500/20'}`}>
        <h3 className={`font-orbitron text-xs tracking-widest uppercase flex items-center gap-2 transition-colors ${isAlert ? 'text-rose-400' : 'text-emerald-400'}`}>
          <span className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] ${isAlert ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`} />
          Quantum Encryption Diagnostics
        </h3>
        <span className="text-[10px] text-slate-500 font-mono">ENIGMA_CORE_v2</span>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="space-y-4">
          <div>
            <div className="text-[9px] text-slate-400 uppercase mb-1">Key_Strength (Qubits)</div>
            <div className="text-xl font-orbitron text-emerald-100">{current.keyStrength}</div>
            <div className="flex gap-1 mt-1">
              {Array.from({length: 8}).map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full ${i < 6 ? (isAlert ? 'bg-rose-500' : 'bg-emerald-500') : 'bg-slate-800'}`} />
              ))}
            </div>
          </div>

          <div>
            <div className={`text-[9px] uppercase mb-1 transition-colors ${isCriticalDecay ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
              Entanglement_Decay {isCriticalDecay && "!!"}
            </div>
            <div className="h-20 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={diagData}>
                  <defs>
                    <linearGradient id="decayGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={isCriticalDecay ? "#f43f5e" : "#10b981"} stopOpacity={0.4}/>
                      <stop offset="95%" stopColor={isCriticalDecay ? "#f43f5e" : "#10b981"} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <YAxis domain={[0, 0.2]} hide />
                  <Area 
                    type="stepAfter" 
                    dataKey="value" 
                    stroke={isCriticalDecay ? "#f43f5e" : "#10b981"} 
                    fill="url(#decayGrad)" 
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
              {isCriticalDecay && <div className="absolute inset-0 bg-rose-500/5 animate-pulse pointer-events-none" />}
            </div>
            <div className="flex justify-between mt-1">
              <span className={`text-[10px] font-mono transition-colors ${isCriticalDecay ? 'text-rose-500 font-bold' : 'text-emerald-500'}`}>
                {current.entanglementDecay}% / s
              </span>
              <span className={`text-[10px] font-mono ${isCriticalDecay ? 'text-rose-600 animate-pulse' : 'text-slate-600'}`}>
                {isCriticalDecay ? 'UNSTABLE' : 'STABLE'}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className={`border p-2 rounded transition-colors ${isAlert ? 'bg-rose-950/20 border-rose-500/30' : 'bg-emerald-500/5 border-emerald-500/10'}`}>
            <div className="text-[9px] text-slate-400 uppercase mb-2">Potential_Vulnerabilities</div>
            <div className="space-y-2">
              {current.activeVulnerabilities.map((v, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] font-mono">
                  <span className={`w-1 h-1 rounded-full ${isAlert ? 'bg-rose-500' : 'bg-amber-500'}`} />
                  <span className="text-slate-300">{v}</span>
                  <span className="ml-auto text-emerald-500/50">[MITIGATED]</span>
                </div>
              ))}
              <div className={`flex items-center gap-2 text-[10px] font-mono animate-pulse ${isAlert ? 'text-rose-500' : 'text-emerald-500'}`}>
                <span className="w-1 h-1 bg-current rounded-full" />
                {isAlert ? 'RE-CALIBRATING CORE...' : 'SCANNING SECTOR 0xFF...'}
              </div>
            </div>
          </div>

          <div className={`flex flex-col items-center justify-center border rounded p-2 transition-all ${
            isCriticalIntegrity ? 'bg-rose-900/30 border-rose-500 animate-bounce' : 'bg-slate-950/40 border-emerald-500/20'
          }`}>
            <div className="text-[10px] text-slate-500 uppercase">Integrity_Score</div>
            <div className={`text-2xl font-orbitron transition-colors ${isCriticalIntegrity ? 'text-rose-500' : 'text-emerald-400'}`}>
              {current.integrityScore.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
      
      <div className={`mt-2 text-[8px] font-mono overflow-hidden whitespace-nowrap transition-colors ${isAlert ? 'text-rose-900' : 'text-emerald-900'}`}>
        0x45 0x12 0xAA 0xBC 0x99 0x88 0x77 0x66 0x55 0x44 0x33 0x22 0x11 0x00 0xFE 0xDC 0xBA 0x98 0x76 0x54 0x32 0x10
      </div>
    </div>
  );
};
