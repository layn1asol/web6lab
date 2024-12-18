document.addEventListener("DOMContentLoaded", async function () {
    const toastContainer = document.getElementById("toast-container");

    // Function to fetch toast data from the JSON file
    async function fetchToasts() {
        try {
            const response = await fetch('toasts.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const toasts = await response.json();
            displayToasts(toasts);
        } catch (error) {
            console.error('Error fetching toasts:', error);
        }
    }

    // Function to display toasts in the toast-container div
    function displayToasts(toasts) {
        if (toasts.length === 0) {
            toastContainer.innerHTML = "<p>No toasts to display!</p>";
            return;
        }

        toastContainer.innerHTML = ""; // Clear container
        toasts.forEach(({ header, body, date }) => {
            const toast = document.createElement("div");
            toast.classList.add("toast", "me-2", "mb-2");
            toast.setAttribute("role", "alert");
            toast.setAttribute("aria-live", "assertive");
            toast.setAttribute("aria-atomic", "true");
            toast.setAttribute("data-bs-autohide", "false");

            toast.innerHTML = `
                <div class="toast-header">
                    <strong class="me-auto">${header}</strong>
                    <small class="text-muted">${new Date(date).toLocaleDateString()}</small>
                </div>
                <div class="toast-body">
                    ${body}
                </div>
            `;

            toastContainer.appendChild(toast);

            // Use Bootstrap Toast functionality if required
            const bootstrapToast = new bootstrap.Toast(toast);
            bootstrapToast.show();
        });
    }

    // Fetch and display toasts when the page loads
    fetchToasts();
});

