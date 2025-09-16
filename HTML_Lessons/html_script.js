document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".sidebar a");
  const sidebar = document.querySelector(".sidebar");
  const lastLesson = document.querySelector("#lesson16");

  // Highlight active link
  links.forEach(link => {
    link.addEventListener("click", () => {
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Stop sidebar scroll at lesson 16
  window.addEventListener("scroll", () => {
    const rect = lastLesson.getBoundingClientRect();

    if (rect.top <= 100) {
      sidebar.style.position = "absolute";
      sidebar.style.bottom = "0";
      sidebar.style.top = "auto";
    } else {
      sidebar.style.position = "sticky";
      sidebar.style.top = "1rem";
      sidebar.style.bottom = "auto";
    }
  });
});

// Progress Bar
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.querySelector(".progress-bar").style.width = progress + "%";
});

// Back to Top
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
