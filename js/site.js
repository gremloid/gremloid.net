// Shared behavior for every page: theme switch, mobile menu, and footer year.
(function () {
    var root = document.documentElement;

    // Theme switch (sun / moon)
    var themeToggle = document.querySelector(".theme-toggle");
    function syncThemeToggle() {
        if (!themeToggle) return;
        var isDark = root.getAttribute("data-theme") === "dark";
        themeToggle.setAttribute("aria-checked", String(isDark));
        themeToggle.title = isDark ? "Switch to light mode" : "Switch to dark mode";
    }
    function reapplyTheme() {
        window.applySavedTheme();
        syncThemeToggle();
    }

    if (themeToggle) {
        syncThemeToggle();
        themeToggle.addEventListener("click", function () {
            var isDark = root.getAttribute("data-theme") !== "dark";
            root.setAttribute("data-theme", isDark ? "dark" : "light");
            try { localStorage.setItem("dark-theme", String(isDark)); } catch (e) {}
            syncThemeToggle();
        });
    }

    // Pages restored with the Back/Forward buttons come from the browser's cache with their
    // old theme, so re-read the saved choice whenever a page is shown.
    window.addEventListener("pageshow", reapplyTheme);
    // Keep other open tabs in sync when the theme changes in one of them.
    window.addEventListener("storage", function (e) {
        if (e.key === "dark-theme") reapplyTheme();
    });

    // Mobile menu
    var header = document.querySelector(".site-header");
    var menuToggle = document.querySelector(".menu-toggle");
    if (header && menuToggle) {
        menuToggle.addEventListener("click", function () {
            var open = header.classList.toggle("menu-open");
            menuToggle.setAttribute("aria-expanded", String(open));
        });
    }

    // Footer year
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
})();
