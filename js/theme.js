// Loaded in <head> (not deferred) so the saved theme is applied before the page paints.
// Uses the same "dark-theme" key as the original site, so returning visitors keep their choice.
(function () {
    function preferredTheme() {
        var saved = null;
        try { saved = localStorage.getItem("dark-theme"); } catch (e) {}
        if (saved !== null) return saved === "true" ? "dark" : "light";
        return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    window.applySavedTheme = function () {
        document.documentElement.setAttribute("data-theme", preferredTheme());
    };
    window.applySavedTheme();
})();
