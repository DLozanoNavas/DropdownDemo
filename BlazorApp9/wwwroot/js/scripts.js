window.utils = {
    activeDropdown: null,

    registerDropdown: (dotNetHelper, dropdownId) => {
        // Remove any existing event listener before adding a new one
        document.removeEventListener("click", window.utils.handleOutsideClick);

        // Set the active dropdown
        window.utils.activeDropdown = dropdownId;

        // Attach event listener to detect clicks outside
        document.addEventListener("click", window.utils.handleOutsideClick);
    },

    unregisterDropdown: () => {
        // Remove the event listener when the dropdown is closed
        document.removeEventListener("click", window.utils.handleOutsideClick);
        window.utils.activeDropdown = null;
    },

    handleOutsideClick: (event) => {
        const activeDropdown = document.getElementById(window.utils.activeDropdown);

        // If there is no active dropdown, do nothing
        if (!activeDropdown) return;

        // If the clicked element is inside the dropdown, do nothing
        if (activeDropdown.contains(event.target)) return;

        // If the clicked element is outside, close the dropdown
        activeDropdown.classList.add("hidden");
        activeDropdown.classList.remove("show");

        // Remove event listener after closing
        window.utils.unregisterDropdown();
    },

    toggleDropdown: (dropdownId, buttonId) => {
        const dropdown = document.getElementById(dropdownId);
        const button = document.getElementById(buttonId);

        if (!dropdown || !button) return;

        const buttonRect = button.getBoundingClientRect();
        dropdown.style.top = `${buttonRect.bottom + 5}px`;
        dropdown.style.left = `${buttonRect.left}px`;
        dropdown.style.width = `${buttonRect.width}px`;

        const isOpening = dropdown.classList.contains("hidden");

        // Close any active dropdown first
        if (window.utils.activeDropdown && window.utils.activeDropdown !== dropdownId) {
            window.utils.closeDropdown(window.utils.activeDropdown);
        }

        dropdown.classList.toggle("hidden", !isOpening);
        dropdown.classList.toggle("show", isOpening);

        // If opening, register; if closing, unregister
        if (isOpening) {
            window.utils.registerDropdown(null, dropdownId);
        } else {
            window.utils.unregisterDropdown();
        }
    },

    closeDropdown: (dropdownId) => {
        const dropdown = document.getElementById(dropdownId);
        if (dropdown) {
            dropdown.classList.add("hidden");
            dropdown.classList.remove("show");
        }
        window.utils.activeDropdown = null;
        window.utils.unregisterDropdown();
    }
};
