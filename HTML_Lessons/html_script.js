// Handle popovers
document.querySelectorAll(".concept-nav-list a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    // Hide any open popover
    document.querySelectorAll(".popover").forEach(pop => pop.style.display = "none");

    // Find target popover
    const targetId = link.getAttribute("data-popover");
    const popover = document.getElementById(targetId);

    if (popover) {
      const rect = link.getBoundingClientRect();
      popover.style.display = "block";
      popover.style.top = rect.bottom + window.scrollY + 8 + "px";
      popover.style.left = rect.left + window.scrollX + "px";
    }
  });
});

// Close popover when clicking outside
document.addEventListener("click", e => {
  if (!e.target.closest(".concept-nav-list")) {
    document.querySelectorAll(".popover").forEach(pop => pop.style.display = "none");
  }
});
