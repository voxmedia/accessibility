(function() {
  var fixedClass = 'is-fixed';
  var fixedNav = document.querySelector('.c-nav--sticky');

  document.addEventListener('navStateChange', function() {
    fixedNav.classList.toggle(fixedClass);
  });
})();
