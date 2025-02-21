window.utils = {
    addDropdownCloseEventBehavior: (dotNetHelper) => {
        document.addEventListener("click", (e) => {
            document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
                if (!dropdown.closest(".dropdown")?.contains(e.target)) {
                    dotNetHelper.invokeMethodAsync("CloseDropdown");
                }
            });
        });
    },

    removeDropdownCloseEventBehavior: (dotNetHelper) => {
        document.removeEventListener("click", () => {
            dotNetHelper.invokeMethodAsync("CloseDropdown");
        });
    },

    positionDropdown: (dropdownId, buttonId) => {
        const dropdown = document.getElementById(dropdownId);
        const button = document.getElementById(buttonId);

        if (!dropdown || !button) return;

        const buttonRect = button.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let top = buttonRect.bottom + 5;
        let left = buttonRect.left;
        let dropdownWidth = buttonRect.width; // ✅ Ensure dropdown width matches button

        // Prevent dropdown from overflowing the screen
        const dropdownHeight = dropdown.offsetHeight;
        if (top + dropdownHeight > viewportHeight) {
            top = buttonRect.top - dropdownHeight - 5;
        }

        if (left + dropdownWidth > viewportWidth) {
            left = viewportWidth - dropdownWidth - 10;
        }

        dropdown.style.top = `${top}px`;
        dropdown.style.left = `${left}px`;
        dropdown.style.width = `${dropdownWidth}px`; // ✅ Matches button width
        dropdown.style.visibility = "visible";
        dropdown.style.opacity = "1";
    }
};
