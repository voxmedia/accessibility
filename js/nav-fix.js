var fixedNav = document.querySelector('.c-nav--sticky');
var guidelinesSection = document.querySelector('.c-guidelines');
var startFixedPosition = fixedNav.offsetTop;
var endFixedPosition = guidelinesSection.offsetTop + guidelinesSection.offsetHeight;
var fixedClass = 'is-fixed';

function handleFixedNav () {
  if(window.pageYOffset > startFixedPosition || window.pageYOffset < endFixedPosition) {
    fixedNav.classList.add(fixedClass);
  }

  if(window.pageYOffset < startFixedPosition || window.pageYOffset > endFixedPosition) {
    fixedNav.classList.remove(fixedClass);
  }
}

window.addEventListener('scroll', handleFixedNav, false);
