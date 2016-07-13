(function() {
  var fixedClass = 'is-fixed';
  var navActiveClass = 'is-active';
  var fixedNav = document.querySelector('.c-nav--sticky');
  var sections = [];
  var activeEl;

  (function defineSectionHeights() {
    var segments = $$('.l-segment');

    segments.forEach(function(seg) {
      if (!seg.id) {
        return false;
      }

      var navEl = document.querySelector('[data-nav="' + seg.id + '"]');

      if (navEl) {
        var dims = seg.getBoundingClientRect();
        var top = (dims.top + window.pageYOffset) - 100;
        sections.push([top, top + dims.height, navEl]);

        navEl.addEventListener('click', highlightActive);
      }
    });
  })();

  function highlightActive() {
    sections.forEach(function(section) {
      var Y = window.pageYOffset;
      if (Y > section[0] && Y < section[1]) {
        if (activeEl && activeEl[0] === section[0]) {return false;}

        if (activeEl) {
          activeEl[2].classList.remove(navActiveClass);
        }
        section[2].classList.add(navActiveClass);
        activeEl = section;
      }
    })
  }

  document.addEventListener('navStateChange', function() {
    fixedNav.classList.toggle(fixedClass);
  });

  document.addEventListener('navHighlightScroll', function() {
    highlightActive();
  })
})();
