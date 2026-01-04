
import React, { useState, useEffect } from 'react';
import { CyberTerminal } from './components/CyberTerminal';
import { ThreatMap } from './components/ThreatMap';
import { AICommandCenter } from './components/AICommandCenter';
import { MetricChart } from './components/MetricChart';
import { QuantumEncryptionDiagnostics } from './components/QuantumEncryptionDiagnostics';
import { Icons } from './constants';
import { SystemMetrics } from './types';

const App: React.FC = () => {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState<SystemMetrics>({
    cpu: 45,
    memory: 62,
    network: 12,
    quantumStability: 99.9,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      const newValue = Math.floor(Math.random() * 40) + 30;
      setMetrics(prev => [...prev.slice(-19), { time, value: newValue }]);
      
      setCurrentMetrics({
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 20) + 60,
        network: Math.floor(Math.random() * 80) + 10,
        quantumStability: 99.8 + Math.random() * 0.2,
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col text-cyan-400 p-4 gap-4 overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-cyan-500/30 pb-4 bg-slate-950/50 backdrop-blur-md px-4 rounded-t-xl">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/40">
            <Icons.Shield />
          </div>
          <div>
            <h1 className="font-orbitron font-black text-2xl tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-400 animate-gradient-x">
              QUANTUM-SUPER
            </h1>
            <p className="text-[10px] text-cyan-500/70 tracking-[0.4em] uppercase font-bold">
              Cyber Intelligence Hub v8.4
            </p>
          </div>
        </div>

        <div className="flex gap-8 items-center font-mono">
          <div className="text-right">
            <div className="text-[10px] text-slate-500">QUANTUM_ENTROPY</div>
            <div className="text-xl font-bold">{currentMetrics.quantumStability.toFixed(4)}%</div>
          </div>
          <div className="h-10 w-[1px] bg-slate-800" />
          <div className="text-right">
            <div className="text-[10px] text-slate-500">THREAT_LEVEL</div>
            <div className="text-xl font-bold text-rose-500">CRITICAL</div>
          </div>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-xs">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            LIVE LINK: SECURE
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        
        {/* Left Column: Metrics & Logs */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 min-h-0">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/40 border border-cyan-500/20 p-3 rounded-lg">
              <div className="text-[10px] text-slate-500 mb-1">CPU_LOAD</div>
              <div className="text-2xl font-orbitron">{currentMetrics.cpu}%</div>
              <div className="w-full h-1 bg-slate-800 mt-2 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500" style={{ width: `${currentMetrics.cpu}%` }} />
              </div>
            </div>
            <div className="bg-slate-900/40 border border-cyan-500/20 p-3 rounded-lg">
              <div className="text-[10px] text-slate-500 mb-1">MEM_ALLOC</div>
              <div className="text-2xl font-orbitron">{currentMetrics.memory}%</div>
              <div className="w-full h-1 bg-slate-800 mt-2 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500" style={{ width: `${currentMetrics.memory}%` }} />
              </div>
            </div>
          </div>

          <MetricChart title="Packet Analysis (p/s)" data={metrics} color="#22d3ee" />
          
          <div className="flex-1 min-h-0">
            <CyberTerminal />
          </div>
        </div>

        {/* Center Column: Threat Map & Diagnostics */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-4 min-h-0 overflow-y-auto pr-1 custom-scrollbar">
          <ThreatMap />
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {/* Node Security Status */}
            <div className="bg-slate-900/40 border border-cyan-500/10 rounded-lg p-4 relative overflow-hidden group min-h-[300px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-orbitron font-bold uppercase tracking-widest">Node Status</h2>
                    <p className="text-[10px] text-slate-400">Deep Packet Grid</p>
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-2 flex-1 overflow-y-auto pr-2">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`aspect-square rounded-sm border flex flex-col items-center justify-center gap-1 ${
                        Math.random() > 0.95 
                          ? 'bg-rose-500/20 border-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.3)]' 
                          : 'bg-slate-800/50 border-slate-700'
                      }`}
                    >
                      <div className="text-[7px] opacity-40">{i.toString(16).toUpperCase()}</div>
                      <div className={`w-1 h-1 rounded-full ${Math.random() > 0.1 ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantum Diagnostics Section */}
            <div className="min-h-[300px]">
              <QuantumEncryptionDiagnostics />
            </div>
          </div>

          {/* New System Footer Block inside Center */}
          <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-lg flex justify-around items-center font-mono text-[10px]">
             <div className="flex items-center gap-2"><span className="text-slate-600">ENCRYPTION:</span> AES-Q-256</div>
             <div className="flex items-center gap-2"><span className="text-slate-600">PROTOCOL:</span> TLS 4.0 (NEURAL)</div>
             <div className="flex items-center gap-2"><span className="text-slate-600">SIGNATURE:</span> RSA-8192-ECDSA</div>
          </div>
        </div>

        {/* Right Column: AI Assistant */}
        <div className="col-span-12 lg:col-span-3 min-h-0">
          <AICommandCenter />
        </div>

      </main>

      {/* Footer Info-bar */}
      <footer className="h-8 flex items-center justify-between px-4 bg-slate-900 border border-slate-800 rounded-b-xl text-[10px] font-mono tracking-widest text-slate-500">
        <div className="flex gap-6">
          <span>LAT: 37.7749° N</span>
          <span>LONG: 122.4194° W</span>
          <span>UPTIME: 1,422:12:44:09</span>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-cyan-600 uppercase">Secure_Grid_Active</span>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-1 h-3 bg-cyan-900" style={{ height: `${Math.random() * 100}%` }} />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
