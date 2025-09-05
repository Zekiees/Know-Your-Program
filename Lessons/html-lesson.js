// popover.js

document.querySelectorAll('.popover-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();

    // Close other popovers
    document.querySelectorAll('.popover').forEach(pop => pop.style.display = 'none');

    // Toggle current popover
    const popover = btn.nextElementSibling;
    popover.style.display = 'block';

    // Position it under the button
    const rect = btn.getBoundingClientRect();
    const popRect = popover.getBoundingClientRect();
    popover.style.top = (btn.offsetTop + btn.offsetHeight + 8) + "px";
    popover.style.left = (btn.offsetLeft - popRect.width/2 + btn.offsetWidth/2) + "px";
  });
});

// Close popover when clicking outside
document.addEventListener('click', e => {
  if (!e.target.closest('.popover-btn') && !e.target.closest('.popover')) {
    document.querySelectorAll('.popover').forEach(pop => pop.style.display = 'none');
  }
});
// script.js