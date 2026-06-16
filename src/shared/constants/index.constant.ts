export const theme_script = `(function() {
  try {
    var theme = localStorage.getItem('theme');
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme) {
      if (theme === 'system') {
        var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.add(dark ? 'dark' : 'light');
      } else {
        root.classList.add(theme);
      }
    } else {
      var path = window.location.pathname;
      var isLanding = path === '/' || path.startsWith('/about') || path.startsWith('/contact');
      if (isLanding) {
        var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.add(dark ? 'dark' : 'light');
      } else {
        root.classList.add('light');
      }
    }
  } catch(e) {}
})();`
