// ── Mobile nav
function openMobileNav() {
  document.getElementById('mobileNav').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('DOMContentLoaded', function() {
  var nav = document.getElementById('mobileNav');
  if (nav) {
    nav.addEventListener('click', function(e) {
      if (e.target === this) closeMobileNav();
    });
  }
});

// ── Case selector
var activeCase = null;
function selectCase(id) {
  document.querySelectorAll('.case-btn').forEach(function(b) { b.classList.remove('active'); });
  document.querySelectorAll('.case-detail').forEach(function(d) { d.classList.remove('active'); });
  if (activeCase === id) { activeCase = null; return; }
  activeCase = id;
  document.getElementById('btn-' + id).classList.add('active');
  var detail = document.getElementById('detail-' + id);
  detail.classList.add('active');
  setTimeout(function() {
    detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 50);
}
