
export interface ThreatNode {
  id: string;
  name: string;
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  type: string;
  location: string;
  timestamp: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'INFO' | 'WARNING' | 'ERROR' | 'SYSTEM';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface SystemMetrics {
  cpu: number;
  memory: number;
  network: number;
  quantumStability: number;
}

export interface QuantumDiagnostics {
  keyStrength: number; // in Qubits
  entanglementDecay: number; // percentage
  noiseLevel: number; // dB
  activeVulnerabilities: string[];
  integrityScore: number;
}
