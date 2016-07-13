// if optional element is provided, the selector will be scoped
// to the element, otherwise the document is queried
// results are returned as an Array not an HTMLObject
function $$(sel, el) {
  // turn this into an array for easier loopability
  var results;
  if (el) {
    results = el.querySelectorAll(sel);
  } else {
    results = document.querySelectorAll(sel);
  }
  return Array.prototype.slice.call(results);
}
