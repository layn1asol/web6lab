async function fetchToasts() {
    try {
        const response = await fetch('get_toasts.php');
        const toasts = await response.json();

        const toastContainer = document.querySelector('.middle2');
        toastContainer.innerHTML = ''; // Clear existing content

        toasts.forEach(toast => {
            const toastElement = document.createElement('div');
            toastElement.classList.add('toast');
            toastElement.setAttribute('role', 'alert');
            toastElement.setAttribute('aria-live', 'assertive');
            toastElement.setAttribute('aria-atomic', 'true');
            toastElement.innerHTML = `
                <div class="toast-header">
                    <strong class="me-auto">${toast.header}</strong>
                    <small class="text-muted">${new Date(toast.date).toLocaleDateString()}</small>
                </div>
                <div class="toast-body">
                    ${toast.body}
                </div>
            `;
            toastContainer.appendChild(toastElement);
        });
    } catch (error) {
        console.error('Error fetching toasts:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchToasts();
    setInterval(fetchToasts, 5000); // Update every 5 seconds
});