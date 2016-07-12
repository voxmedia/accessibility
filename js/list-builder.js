function $$(sel) {
  // turn this into an array for easier loopability
  return Array.prototype.slice.call(document.querySelectorAll(sel));
}

new Clipboard('.c-guidelines__copy');

(function(container){ // write some JS

  if (!container) {
    return false;
  }

  var checkboxes = $$('input[type="checkbox"]');
  var textarea = container.querySelector('.preview-box');
  var outputType = document.getElementById('output').value;
  var active = [];

  function formatPreview(start) {
    start = start ? start : "";
    var ret = active.reduce(function(prev, curr, idx){
      var str = curr[0];
      if (outputType !== "plaintext") {
        str = str + " (More Info)[" + window.location.href + "#" + curr[1] + "]";
      }
      return idx === 0 ? start + str : prev + start + str;
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
        var deets = [c.parentNode.querySelector('p').innerText, c.parentNode.id]
        newActive.push(deets);
      }
    });
    active = newActive;
    outputPreview();
  }

  document.getElementById('output').addEventListener('change', function(ev) {
    outputType = ev.target.value;
    outputPreview();
  });

  checkboxes = checkboxes.map(function(input) {
    if (input.getAttribute('data-skip')) {
      return false;
    }

    input.addEventListener('change', rebuildActive);
    return input;
  });

 })(document.querySelector('.c-guidelines'))
