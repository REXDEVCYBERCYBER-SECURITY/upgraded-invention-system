# 💠 Quantum-Super Cyber Intelligence Hub

> **SECURITY CLEARANCE LEVEL 4 REQUIRED**  
> *Real-time defense orchestration and quantum-integrity monitoring system.*

The **Quantum-Super Cyber Intelligence Hub** is a cutting-edge command and control (C2) dashboard designed for the next generation of cybersecurity. It integrates deep-learning threat analysis via Google's Gemini API with a high-fidelity diagnostic suite for quantum-encrypted networks.

---

## 🛰️ System Architecture

The hub is built on a distributed reactive architecture, ensuring sub-millisecond telemetry updates across four primary modules:

### 1. Neural Threat Topology (D3.js Core)
- **Engine**: Custom force-directed graph algorithm.
- **Function**: Visualizes the "Neural Mesh" of global network nodes.
- **Diagnostics**: Identifies intrusion vectors in real-time. Red nodes represent confirmed breaches, while blue/cyan nodes represent secure segments.
- **Overlay**: Includes a synchronized "Pulse Scan" that refreshes node status across the viewport.

### 2. Quantum Encryption Diagnostics (Q-Diag)
- **Monitoring**: Tracks Qubit key strength (fixed at 8192-bit for high-security sectors) and Entanglement Decay.
- **Integrity Alert System**: 
  - **Critical Threshold**: Integrity < 98.0% or Decay > 0.15%/s.
  - **Visual Protocol**: Triggers `protocol: RED_ALERT`. The UI enters an "animate-cyber-flash" state with high-intensity rose-red borders and emergency banners.
- **Vulnerability Scanner**: Continuous heuristic analysis for "Coherence Drift" and "Phase Shift Noise."

### 3. Gemini AI "Core Intelligence"
- **Model**: `gemini-3-pro-preview`
- **Role**: Strategic Cyber-Defense Assistant.
- **Capabilities**: Forensic analysis, threat actor profiling, and automated response strategy formulation.
- **Tone**: Technical, authoritative, and info-dense.

### 4. System Telemetry Grid
- **Metrics**: Real-time AreaCharts (via Recharts) monitoring packet analysis and system throughput.
- **Sector Grid**: 48-node detailed view showing the micro-status of individual sandbox clusters.

---

## 🎨 Visual Design Philosophy

The Hub utilizes a **High-Contrast Cyber-Noir** aesthetic:
- **Palette**: `Slate-950` (Deep Void) base with `Cyan-400` (Information) and `Indigo-500` (Neural Energy) accents. `Rose-500` is reserved strictly for `CRITICAL` status.
- **Typography**: `Orbitron` for cinematic headers and `JetBrains Mono` for high-readability technical data.
- **Post-Processing**: A CSS-based **Scanline Overlay** and **Radial Glows** provide depth and the feeling of a high-end physical CRT/LCD glass console.

---

## 🛠 Operational Setup

### Environment Variables
The system requires a Gemini API key to initialize the Core Intelligence module.
```env
API_KEY=your_google_gemini_api_key
```

### Key Components
- `App.tsx`: Global state orchestrator and layout engine.
- `QuantumEncryptionDiagnostics.tsx`: The primary diagnostic interface for secure channels.
- `ThreatMap.tsx`: D3-based topology visualization.
- `CyberTerminal.tsx`: Low-level system event logger.

## 🛡️ Security Disclaimer
This application is a highly sophisticated simulation. In production environments, the data-feed hooks in `App.tsx` should be connected to live ELK stacks, Prometheus exporters, or QKD (Quantum Key Distribution) hardware interfaces.

---

*“In the quantum realm, the only constant is vigilance.”*
