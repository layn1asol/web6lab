document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('toast-form');
    const toastContainer = document.getElementById('toast-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const header = document.getElementById('toast-header').value;
        const body = document.getElementById('toast-body').value;
        const date = document.getElementById('toast-date').value;

        // Create a new toast element
        const toast = document.createElement('div');
        toast.classList.add('toast', 'me-2', 'mb-2');
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        toast.setAttribute('data-bs-autohide', 'false'); // Disable autohide

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




    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const header = document.getElementById('toast-header').value;
        const body = document.getElementById('toast-body').value;
        const date = document.getElementById('toast-date').value;

        const toastData = { header, body, date };

        try {
            const response = await fetch('save_toast.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(toastData),
            });

            const result = await response.json();
            if (result.status === 'success') {
                alert('Toast saved successfully!');
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error saving toast:', error);
        }
    });


});




