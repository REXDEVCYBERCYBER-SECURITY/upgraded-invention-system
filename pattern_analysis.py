import qiskit as q
from qiskit_ibm_runtime import QiskitRuntimeService

circuit = q.QuantumCircuit(2, 2)
circuit.h(0)
circuit.cx(0, 1)
circuit.measure([0,1], [0,1])

job = q.execute(circuit, backend='simulator', shots=1024)
print(f"Intelligence Pattern Results: {job.result()}")
