<?php
$dataFile = 'toasts.json';

// Get the incoming data
$toastData = file_get_contents('php://input');
$toast = json_decode($toastData, true);

if ($toast) {
    // Read existing data
    $existingData = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : [];
    $existingData[] = $toast;

    // Save the updated data
    file_put_contents($dataFile, json_encode($existingData));
    echo json_encode(['status' => 'success', 'message' => 'Toast saved']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
}
?>
