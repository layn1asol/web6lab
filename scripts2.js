document.addEventListener("DOMContentLoaded", async function () {
    const toastContainer = document.getElementById("toast-container");

    // fetch toast data from the JSON file
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

    // display toasts in the toast-container div
    function displayToasts(toasts) {
        if (toasts.length === 0) {
            toastContainer.innerHTML = "<p style=\"color: white;\">No toasts to display!</p>";
            return;
        }

        toastContainer.innerHTML = ""; // clear container
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

            // use bootstrap toast functionality if required
            const bootstrapToast = new bootstrap.Toast(toast);
            bootstrapToast.show();
        });
    }

    fetchToasts();
});

