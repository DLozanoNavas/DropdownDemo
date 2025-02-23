window.utils = {
    activeDropdown: null,
    debounceTimeout: null,

    registerDropdown: (dotNetHelper, dropdownId) => {
        document.removeEventListener("click", window.utils.handleOutsideClick);
        window.utils.activeDropdown = dropdownId;
        document.addEventListener("click", window.utils.handleOutsideClick);
    },

    unregisterDropdown: () => {
        document.removeEventListener("click", window.utils.handleOutsideClick);
        window.utils.activeDropdown = null;
    },

    handleOutsideClick: (event) => {
        const activeDropdown = document.getElementById(window.utils.activeDropdown);
        if (!activeDropdown) return;
        if (activeDropdown.contains(event.target)) return;
        window.utils.closeDropdown(window.utils.activeDropdown);
    },

    debounce: (func, delay) => {
        return (...args) => {
            clearTimeout(window.utils.debounceTimeout);
            window.utils.debounceTimeout = setTimeout(() => func(...args), delay);
        };
    },

    toggleDropdown: (dropdownId, buttonId) => {
        const dropdown = document.getElementById(dropdownId);
        const button = document.getElementById(buttonId);

        if (!dropdown || !button) return;

        const isOpening = dropdown.classList.contains("hidden");

        if (window.utils.activeDropdown && window.utils.activeDropdown !== dropdownId) {
            window.utils.closeDropdown(window.utils.activeDropdown);
        }

        dropdown.classList.toggle("hidden", !isOpening);
        dropdown.classList.toggle("show", isOpening);

        if (isOpening) {
            window.utils.registerDropdown(null, dropdownId);
            window.utils.debounce(window.utils.positionDropdown, 50)(dropdownId, buttonId);
        } else {
            window.utils.unregisterDropdown();
        }
    },

    positionDropdown: (dropdownId, buttonId) => {
        const dropdown = document.getElementById(dropdownId);
        const button = document.getElementById(buttonId);
        if (!dropdown || !button) return;

        const buttonRect = button.getBoundingClientRect();
        dropdown.style.top = `${buttonRect.bottom + 5}px`;
        dropdown.style.left = `${buttonRect.left}px`;
        dropdown.style.width = `${buttonRect.width}px`;
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
