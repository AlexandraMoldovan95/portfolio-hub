// Puts a saved theme choice on <html> before the page is drawn. It used to be set from script.js at
// the end of the page, so a visitor who had picked light on a dark-mode computer saw the dark page
// (and its dark pictures started downloading) for a moment first. With nothing saved there's no
// attribute, and styles.css follows the system setting. script.js still runs the toggle button.
(function () {
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') document.documentElement.setAttribute('data-theme', saved);
  } catch (e) { /* storage blocked: the system setting decides */ }
})();
