
import React, { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { QuantumDiagnostics, VulnerabilityDetail, ScriptMetadata } from '../types';
// Import Icons from constants to resolve 'Cannot find name Icons' error
import { Icons } from '../constants';

const INTEGRITY_THRESHOLD = 98.0;
const DECAY_THRESHOLD = 0.15;

const THREAT_DATABASE: Omit<VulnerabilityDetail, 'timestamp'>[] = [
  { 
    name: "Quantum Tunneling Leak", 
    impact: "Active data egress detected via non-classical tunneling. Potential private key fragment leakage across secondary relays.", 
    origin: "External Relay 0x7G (Secure Gateway)" 
  },
  { 
    name: "Superposition Collapse", 
    impact: "Destruction of entangled qubit pairs. Imminent communication blackout on the primary neural mesh link.", 
    origin: "Internal Cooling Grid (Thermal Anomaly)" 
  },
  { 
    name: "Entanglement Hijack", 
    impact: "Unauthorized observer node inserted into Bell-state pairs. Man-in-the-middle cryptographic risk level: CRITICAL.", 
    origin: "Edge Router 0xAF (Spoofed Identity)" 
  },
  { 
    name: "Phase Shift Injection", 
    impact: "Malicious insertion of phase noise into coherent streams. 15% packet drop rate observed on encrypted channels.", 
    origin: "High-Frequency Ingress (Sub-sector 4A)" 
  },
  { 
    name: "Bell State Violation", 
    impact: "Local realism verified on secure link. Quantum security properties negated. Entropy pool compromised.", 
    origin: "Unknown (Inter-Dimensional Interference)" 
  }
];

const INITIAL_SCRIPTS: ScriptMetadata[] = [
  {
    id: 'legacy-bridge',
    filename: 'bridge.php',
    language: 'PHP',
    status: 'IDLE',
    content: `<?php
// Neural Mesh Bridge Protocol
header('Content-Type: application/json');

$entropy = bin2hex(random_bytes(16));
echo json_encode([
    'status' => 'CONNECTED',
    'seed' => $entropy,
    'integrity' => 'PASSED'
]);
?>`
  },
  {
    id: 'quantum-engine',
    filename: 'pattern_analysis.py',
    language: 'PYTHON',
    status: 'IDLE',
    content: `import qiskit as q
from qiskit_ibm_runtime import QiskitRuntimeService

circuit = q.QuantumCircuit(2, 2)
circuit.h(0)
circuit.cx(0, 1)
circuit.measure([0,1], [0,1])

job = q.execute(circuit, backend='simulator', shots=1024)
print(f"Intelligence Pattern Results: {job.result()}")`
  }
];

export const QuantumEncryptionDiagnostics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'DIAG' | 'SCRIPTS'>('DIAG');
  const [diagData, setDiagData] = useState<any[]>([]);
  const [isRotating, setIsRotating] = useState(false);
  const [rotationProgress, setRotationProgress] = useState(0);
  const [scripts, setScripts] = useState<ScriptMetadata[]>(INITIAL_SCRIPTS);
  const [latestThreat, setLatestThreat] = useState<VulnerabilityDetail | null>(null);
  
  const [current, setCurrent] = useState<QuantumDiagnostics>({
    keyStrength: 8192,
    entanglementDecay: 0.042,
    noiseLevel: 0.08,
    activeVulnerabilities: ["Coherence Drift", "Phase Shift Noise"],
    integrityScore: 99.85
  });

  useEffect(() => {
    if (isRotating) return;
    const interval = setInterval(() => {
      const decayVal = parseFloat((Math.random() * 0.1).toFixed(3));
      const integrityVal = parseFloat((98.5 + Math.random() * 1.5).toFixed(2));
      setDiagData(prev => [...prev.slice(-20), { time: Date.now(), value: decayVal }]);
      
      setCurrent(prev => ({
        ...prev,
        entanglementDecay: decayVal,
        integrityScore: integrityVal,
        noiseLevel: parseFloat((0.02 + Math.random() * 0.1).toFixed(3)),
      }));
    }, 1200);
    return () => clearInterval(interval);
  }, [isRotating]);

  const initiateKeyRotation = () => {
    if (isRotating) return;
    setIsRotating(true);
    setRotationProgress(0);
    setLatestThreat(null);

    const duration = 2500;
    const intervalTime = 50;
    const totalSteps = duration / intervalTime;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      setRotationProgress((step / totalSteps) * 100);
      setDiagData(prev => [...prev.slice(-20), { time: Date.now(), value: Math.random() }]);

      if (step >= totalSteps) {
        clearInterval(interval);
        setIsRotating(false);
        setCurrent(prev => ({
          ...prev,
          entanglementDecay: 0.001,
          noiseLevel: 0.002,
          integrityScore: 100.00,
          activeVulnerabilities: ["COHERENCE_STABILIZED"]
        }));
      }
    }, intervalTime);
  };

  const simulateVulnerability = () => {
    if (isRotating) return;
    const threatIdx = Math.floor(Math.random() * THREAT_DATABASE.length);
    const threat = THREAT_DATABASE[threatIdx];
    const detailedThreat: VulnerabilityDetail = {
      ...threat,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setLatestThreat(detailedThreat);
    setCurrent(prev => ({
      ...prev,
      integrityScore: parseFloat((95 + Math.random() * 3).toFixed(2)),
      entanglementDecay: parseFloat((0.12 + Math.random() * 0.1).toFixed(3)),
      activeVulnerabilities: [detailedThreat.name, ...prev.activeVulnerabilities.filter(v => typeof v === 'string')].slice(0, 4)
    }));
  };

  const executeScript = (id: string) => {
    setScripts(prev => prev.map(s => s.id === id ? { ...s, status: 'RUNNING' } : s));
    setTimeout(() => {
      setScripts(prev => prev.map(s => s.id === id ? { ...s, status: 'SUCCESS' } : s));
      setTimeout(() => setScripts(prev => prev.map(s => s.id === id ? { ...s, status: 'IDLE' } : s)), 3000);
    }, 1000);
  };

  return (
    <div className={`transition-all duration-500 rounded-xl flex flex-col h-full backdrop-blur-xl border relative overflow-hidden group/main ${
      isRotating ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_30px_rgba(34,211,238,0.2)]' : 
      current.integrityScore < 98.0 ? 'animate-cyber-flash border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.2)]' : 'bg-slate-900/40 border-indigo-500/20 shadow-xl'
    }`}>
      
      {/* Tabs */}
      <div className="flex bg-slate-950/40 border-b border-indigo-500/10 p-1">
        <button 
          onClick={() => setActiveTab('DIAG')}
          className={`flex-1 py-3 text-[10px] font-orbitron tracking-[0.2em] uppercase transition-all rounded-lg flex items-center justify-center gap-2 ${activeTab === 'DIAG' ? 'text-cyan-400 bg-cyan-500/10 shadow-[inset_0_0_10px_rgba(34,211,238,0.1)]' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${activeTab === 'DIAG' ? 'bg-cyan-400' : 'bg-transparent'}`} />
          Telemetry
        </button>
        <button 
          onClick={() => setActiveTab('SCRIPTS')}
          className={`flex-1 py-3 text-[10px] font-orbitron tracking-[0.2em] uppercase transition-all rounded-lg flex items-center justify-center gap-2 ${activeTab === 'SCRIPTS' ? 'text-indigo-400 bg-indigo-500/10 shadow-[inset_0_0_10px_rgba(99,102,241,0.1)]' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${activeTab === 'SCRIPTS' ? 'bg-indigo-400' : 'bg-transparent'}`} />
          Scripts
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col min-h-0 relative">
        {activeTab === 'DIAG' ? (
          <>
            {/* DISRUPTION OVERLAY */}
            {isRotating && (
              <div className="absolute inset-0 z-50 bg-slate-950/95 flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
                <div className="relative">
                   <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full animate-ping" />
                   <div className="w-16 h-16 border-b-2 border-cyan-400 rounded-full animate-spin flex items-center justify-center">
                      <div className="w-10 h-10 border-t-2 border-indigo-400 rounded-full animate-spin" style={{ animationDirection: 'reverse' }} />
                   </div>
                </div>
                <div className="text-cyan-100 font-orbitron text-[11px] tracking-[0.6em] mt-8 mb-5 font-black uppercase glow-cyan">
                  RE_KEYING_PHASE
                </div>
                <div className="w-full max-w-[220px] h-1.5 bg-slate-800 rounded-full overflow-hidden border border-cyan-500/10">
                    <div className="h-full bg-cyan-400 shadow-[0_0_15px_#22d3ee] transition-all duration-75" style={{ width: `${rotationProgress}%` }} />
                </div>
                <div className="text-[9px] font-mono text-cyan-500/50 mt-4 tracking-widest uppercase">Syncing Entropy Streams...</div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 flex-1 min-h-0">
               {/* Top Stats */}
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 group hover:border-cyan-500/30 transition-all">
                     <div className="text-[9px] text-slate-500 uppercase mb-2 tracking-widest">Key Depth</div>
                     <div className="text-2xl font-orbitron text-cyan-50 leading-none">
                       {current.keyStrength}<span className="text-[10px] opacity-40 ml-1">Qubits</span>
                     </div>
                  </div>
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 group hover:border-indigo-500/30 transition-all">
                     <div className="text-[9px] text-slate-500 uppercase mb-2 tracking-widest">Integrity</div>
                     <div className={`text-2xl font-orbitron leading-none ${current.integrityScore < 98 ? 'text-rose-400' : 'text-emerald-400'}`}>
                       {current.integrityScore.toFixed(2)}<span className="text-[10px] opacity-40 ml-1">%</span>
                     </div>
                  </div>
               </div>

               {/* Detailed Vulnerability Display */}
               <div className={`border p-3 rounded-xl min-h-[85px] transition-all duration-500 overflow-hidden ${
                 latestThreat ? 'bg-rose-950/20 border-rose-500/40' : 'bg-black/20 border-white/5'
               }`}>
                  <div className="text-[8px] text-slate-500 uppercase mb-2 flex justify-between items-center tracking-widest font-bold">
                    <span>Threat Intelligence</span>
                    {latestThreat && <span className="text-rose-500 animate-pulse">! ACTIVE ALERT</span>}
                  </div>
                  {latestThreat ? (
                    <div className="animate-in slide-in-from-right-2 duration-300 space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="text-[10px] font-bold text-rose-400 font-orbitron uppercase tracking-tighter truncate w-3/4">
                          {latestThreat.name}
                        </div>
                        <div className="text-[7px] text-slate-600 font-mono">{latestThreat.timestamp}</div>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5">
                        <div className="flex items-start gap-2 bg-rose-500/5 p-1 rounded border-l border-rose-500/30">
                          <span className="text-[7px] font-black text-rose-500/60 uppercase w-12 shrink-0">Origin:</span>
                          <span className="text-[8px] text-slate-300 font-mono leading-tight">{latestThreat.origin}</span>
                        </div>
                        <div className="flex flex-col gap-0.5 px-1">
                          <span className="text-[7px] font-black text-rose-500/60 uppercase">Impact_Analysis:</span>
                          <p className="text-[8px] text-slate-400 leading-tight italic">{latestThreat.impact}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1 opacity-40">
                      <div className="text-[9px] font-mono text-slate-600 italic">No active external breaches detected.</div>
                      <div className="space-y-1">
                        {current.activeVulnerabilities.slice(0, 2).map((v, i) => (
                          <div key={i} className="flex items-center gap-2 text-[8px] font-mono text-slate-500">
                            <span className="w-1 h-1 rounded-full bg-cyan-500/30" />
                            <span className="truncate">{typeof v === 'string' ? v : v.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
               </div>

               {/* Chart View */}
               <div className="flex-1 min-h-0 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest">Quantum Decay Heuristics</div>
                    <div className="text-[10px] font-mono text-cyan-400/80">{current.entanglementDecay.toFixed(3)}% Decay</div>
                  </div>
                  <div className="flex-1 bg-black/30 rounded-xl border border-white/5 p-3 overflow-hidden">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={diagData}>
                        <defs>
                           <linearGradient id="decayGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={current.integrityScore < 98 ? "#f43f5e" : "#22d3ee"} stopOpacity={0.2}/>
                              <stop offset="95%" stopColor={current.integrityScore < 98 ? "#f43f5e" : "#22d3ee"} stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <YAxis domain={[0, 0.2]} hide />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke={current.integrityScore < 98 ? "#f43f5e" : "#22d3ee"} 
                          strokeWidth={2} 
                          fill="url(#decayGrad)" 
                          isAnimationActive={false} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
               </div>

               {/* Actions */}
               <div className="flex gap-3">
                 <button
                    onClick={initiateKeyRotation}
                    disabled={isRotating}
                    className={`flex-1 border font-orbitron text-[10px] py-3.5 rounded-xl uppercase tracking-[0.3em] transition-all relative overflow-hidden group/btn ${
                      isRotating 
                        ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 cursor-wait' 
                        : 'bg-slate-950 border-cyan-500/20 text-cyan-400 hover:border-cyan-400 hover:bg-cyan-500/10 shadow-lg'
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Icons.Shield />
                      {isRotating ? 'Synchronizing...' : 'Rotate Key'}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                  </button>

                  <button
                    onClick={simulateVulnerability}
                    disabled={isRotating}
                    className="px-4 border border-rose-500/30 text-rose-500 bg-slate-950/40 font-orbitron text-[9px] rounded-xl uppercase tracking-tighter hover:bg-rose-500/10 hover:border-rose-500 transition-all flex items-center justify-center"
                    title="Inject Diagnostic Threat"
                  >
                    Inject Threat
                  </button>
               </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col h-full gap-5 min-h-0">
            <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2">
              {scripts.map(script => (
                <div key={script.id} className="bg-slate-950/60 border border-indigo-500/10 rounded-xl p-4 flex flex-col gap-4 group hover:border-indigo-500/30 transition-all">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-md text-[9px] font-black border tracking-widest ${script.language === 'PHP' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'}`}>
                        {script.language}
                      </span>
                      <span className="text-[11px] font-mono text-slate-200 font-bold">{script.filename}</span>
                    </div>
                    <button 
                      onClick={() => executeScript(script.id)}
                      disabled={script.status === 'RUNNING'}
                      className={`px-3 py-1 rounded-full text-[9px] font-mono border transition-all uppercase tracking-tighter ${
                        script.status === 'RUNNING' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400 animate-pulse' :
                        script.status === 'SUCCESS' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' :
                        'border-white/10 text-slate-500 hover:text-slate-200 hover:border-white/30'
                      }`}
                    >
                      {script.status === 'RUNNING' ? 'Busy...' : script.status === 'SUCCESS' ? 'Success' : 'Compile'}
                    </button>
                  </div>
                  <pre className="text-[10px] font-mono text-slate-400 leading-relaxed overflow-x-auto p-3 bg-black/40 rounded-lg border border-white/5">
                    <code>{script.content}</code>
                  </pre>
                  {script.status === 'SUCCESS' && (
                    <div className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 p-3 border border-emerald-500/20 rounded-lg animate-in slide-in-from-bottom-2">
                      <span className="opacity-50 mr-2">&gt;</span> PROCESS_FINALIZE: PATTERN_SYNC COMPLETE.
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-[9px] font-mono text-slate-600 text-center uppercase tracking-widest italic opacity-60">
              * Kernel modules operating in sandboxed environment *
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
