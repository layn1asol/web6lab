document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('toast-form');
    const toastContainer = document.getElementById('toast-container');
    const saveToastsButton = document.getElementById('save-toasts');
    const deleteToastsButton = document.getElementById('delete-toasts');
    let toastsData = []; // Array to store all toasts

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const header = document.getElementById('toast-header').value;
        const body = document.getElementById('toast-body').value;
        const date = document.getElementById('toast-date').value;

        // Add new toast data to the array
        toastsData.push({ header, body, date });

        // Create a new toast element
        const toast = document.createElement('div');
        toast.classList.add('toast', 'me-2', 'mb-2');
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        toast.setAttribute('data-bs-autohide', 'false');

        toast.innerHTML = `
            <div class="toast-header">
                <strong class="me-auto">${header}</strong>
                <small class="text-muted">${new Date(date).toLocaleDateString()}</small>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${body}
            </div>
        `;

        toastContainer.appendChild(toast);

        const bootstrapToast = new bootstrap.Toast(toast);
        bootstrapToast.show();
    });

    saveToastsButton.addEventListener('click', async function () {
        try {
            const response = await fetch('save_toasts.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ toasts: toastsData }),
            });

            const result = await response.json();
            if (result.status === 'success') {
                alert('All toasts saved successfully!');
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error saving toasts:', error);
        }
    });

    deleteToastsButton.addEventListener('click', async function () {
        try {
            const response = await fetch('delete_toasts.php', { method: 'POST' });
            const result = await response.json();
            if (result.status === 'success') {
                alert('All toasts deleted successfully!');
                toastsData = []; // Clear the local array
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error deleting toasts:', error);
        }
    });
});





