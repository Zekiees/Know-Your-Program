// ✅ Enhanced main.js
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay");
  const hamburger = document.getElementById("hamburger");
  const links = document.querySelectorAll(".sidebar a[href^='#']");
  const backToTop = document.getElementById("backToTop");
  const progressBar = document.querySelector(".progress-bar");

  // Helper: toggle sidebar
  const toggleSidebar = (state) => {
    sidebar.classList.toggle("active", state);
    overlay.classList.toggle("active", state);
    hamburger.classList.toggle("active", state);
    document.body.style.overflow = state ? "hidden" : ""; // prevent background scroll
  };

  // ✅ Toggle sidebar and hamburger
  hamburger?.addEventListener("click", () => {
    const isActive = sidebar.classList.contains("active");
    toggleSidebar(!isActive);
  });

  // ✅ Close sidebar when clicking outside (overlay)
  overlay?.addEventListener("click", () => toggleSidebar(false));

  // ✅ Smooth scroll + close sidebar on link click
  links.forEach(link => {
    link.addEventListener("click", e => {
      const targetID = link.getAttribute("href");
      if (targetID && targetID.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(targetID);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      toggleSidebar(false);
    });
  });

  // ✅ Scroll progress + show Back to Top button
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = Math.min((scrollTop / docHeight) * 100, 100);
    if (progressBar) progressBar.style.width = `${progress}%`;

    if (backToTop) {
      backToTop.classList.toggle("visible", scrollTop > 300);
    }
  });

  // ✅ Smooth scroll to top
  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ✅ (Optional) Keyboard accessibility: close sidebar with ESC key
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && sidebar.classList.contains("active")) {
      toggleSidebar(false);
    }
  });
});
