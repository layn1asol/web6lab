<?php
if (file_exists('toasts.json')) {
    unlink('toasts.json');
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'File not found']);
}
?>

