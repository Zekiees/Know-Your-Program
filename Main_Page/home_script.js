// ✅ Hamburger toggle (becomes X)
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('active');
});

// ✅ Close nav if clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
  }
});

// ✅ Scroll to Lessons button
function scrollToLessons() {
  document.getElementById('lessons').scrollIntoView({ behavior: 'smooth' });
}

// ✅ Auto update year
document.getElementById('y').textContent = new Date().getFullYear();

// ✅ Tab switching (HTML / CSS / JS editors)
const tabs = document.querySelectorAll('.tab-btn');
const editors = {
  html: document.getElementById('html-code'),
  css: document.getElementById('css-code'),
  js: document.getElementById('js-code')
};
const outputFrame = document.getElementById('output');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    Object.keys(editors).forEach(key => editors[key].classList.add('hidden'));
    editors[tab.dataset.tab].classList.remove('hidden');
  });
});

// ✅ Live output update
function updateOutput() {
  const html = editors.html.value;
  const css = `<style>${editors.css.value}</style>`;
  const js = `<script>${editors.js.value}<\/script>`;
  outputFrame.srcdoc = html + css + js;
}

Object.values(editors).forEach(editor => {
  editor.addEventListener('input', updateOutput);
});

updateOutput();

// ✅ Smooth scroll for all # links or scroll buttons
document.querySelectorAll('a[href^="#"], button[data-scroll]').forEach(el => {
  el.addEventListener('click', e => {
    const targetID = el.getAttribute('href') || el.dataset.scroll;
    if (targetID && targetID.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(targetID);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Close menu when clicking a link
      hamburger.classList.remove('active');
      nav.classList.remove('active');
    }
  });
});
