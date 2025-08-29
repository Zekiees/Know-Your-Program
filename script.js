// Hamburger toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('active');
});

function scrollToLessons(){
  document.getElementById('lessons').scrollIntoView({behavior:'smooth'});
}
document.getElementById('y').textContent = new Date().getFullYear();

// Tab Switching
const tabs = document.querySelectorAll('.tab-btn');
const editors = {
  html: document.getElementById('html-code'),
  css: document.getElementById('css-code'),
  js: document.getElementById('js-code')
};
const outputFrame = document.getElementById('output');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Activate clicked tab
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Show corresponding editor
    Object.keys(editors).forEach(key => editors[key].classList.add('hidden'));
    editors[tab.dataset.tab].classList.remove('hidden');
  });
});

// Live Update Output
function updateOutput() {
  const html = editors.html.value;
  const css = `<style>${editors.css.value}</style>`;
  const js = `<script>${editors.js.value}<\/script>`;
  const outputContent = html + css + js;
  outputFrame.srcdoc = outputContent;
}

Object.values(editors).forEach(editor => {
  editor.addEventListener('input', updateOutput);
});

// Initialize Output
updateOutput();
