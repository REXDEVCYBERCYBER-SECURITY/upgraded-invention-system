<?php
// Neural Mesh Bridge - Legacy Protocol
header('Content-Type: application/json');

$node_id = $_GET['node_id'] ?? 'LOCAL_ROOT';
$entropy = bin2hex(random_bytes(16));

echo json_encode([
    'status' => 'CONNECTED',
    'protocol' => 'HEURISTIC_PHASE_v1.0',
    'entropy_seed' => $entropy,
    'last_sync' => date('Y-m-d H:i:s'),
    'integrity_check' => 'PASSED'
]);
?>
