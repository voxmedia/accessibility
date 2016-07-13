(function() {
  var guidelinesSection = document.querySelector('.c-guidelines');
  var startFixedPosition = document.querySelector('.c-nav--sticky').offsetTop;
  var endFixedPosition = guidelinesSection.offsetTop + guidelinesSection.offsetHeight;

  var navState = false;
  var hasScrolled = false;

  function navStateEvent() {
    var ev = new CustomEvent("navStateChange", {
      detail: {
        active: navState
      }
    });
    document.dispatchEvent(ev);
  }

  function navHighlightEvent() {
    var ev = new Event("navHighlightScroll", {"cancelable": false});
    document.dispatchEvent(ev);
  }

  function checkNavPosition () {
    var Y = window.pageYOffset;
    if (!navState && (Y > startFixedPosition || Y < endFixedPosition)) {
      navState = true;
      navStateEvent();
    }

    if (navState && Y > startFixedPosition || Y < endFixedPosition) {
      navHighlightEvent();
    }

    if (navState && (Y < startFixedPosition || Y > endFixedPosition)) {
      navState = false;
      navStateEvent();
    }
  }

  // ANY ONSCROLL FUNCTIONS SHOULD BE ADDED HERE
  function checkScroll() {
    if (hasScrolled) {
      checkNavPosition();
      hasScrolled = false;
    }

    // TODO stop this when a page isn't active
    return setTimeout(checkScroll, 100);
  }

  window.addEventListener('scroll', function(){
    hasScrolled = true;
  }, false);

  checkScroll();
})();
