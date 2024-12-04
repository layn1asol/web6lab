<?php
$dataFile = 'toasts.json';

if (file_exists($dataFile)) {
    $toasts = file_get_contents($dataFile);
    echo $toasts;
} else {
    echo json_encode([]);
}
?>
