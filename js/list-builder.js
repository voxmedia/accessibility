function $$(sel) {
  // turn this into an array for easier loopability
  return Array.prototype.slice.call(document.querySelectorAll(sel));
}

(function(container){ // write some JS

  if (!container) {
    return false;
  }

  var checkboxes = $$('input[type="checkbox"]');
  var textarea = container.querySelector('.preview-box');
  var outputType = document.getElementById('output').value;
  var active = [];
  console.log(checkboxes);

  function formatPreview(start) {
    start = start ? start : "";
    var ret = active.reduce(function(prev, curr, idx){
      return idx === 0 ? start + prev : prev + start + curr;
    }, active[0]);
    return ret;
  }

  function outputPreview() {
    if (!active.length) { return false;}
    var preview;
    switch (outputType) {
      case "github":
        preview = formatPreview("\n- [ ] ");
        break;
      case "markdown":
        preview = formatPreview("\n - ");
        break;
      default:
        preview = active.join("\n");
    }
    textarea.value = preview;
  }

  function rebuildActive() {
    var newActive = []
    checkboxes.forEach(function(c) {
      if (c.checked) {
        newActive.push(c.parentNode.querySelector('p').innerText);
      }
    });
    active = newActive;
    outputPreview();
  }

  document.getElementById('output').addEventListener('change', function(ev) {
    outputType = ev.target.value;
    outputPreview();
  })

  checkboxes.forEach(function(input) {
    input.addEventListener('change', rebuildActive);
  });

 })(document.querySelector('.c-guidelines'))
