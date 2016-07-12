function $$(sel) {
  // turn this into an array for easier loopability
  return Array.prototype.slice.call(document.querySelectorAll(sel));
}

new Clipboard('.c-guidelines__copy');

(function(container){ // write some JS

  if (!container) {
    return false;
  }

  var formatters = {
    github: "\n- [ ] ",
    markdown: "\n - ",
    plaintext: "\n"
  };

  var checkboxes = $$('input[type="checkbox"]');
  var textarea = container.querySelector('.preview-box');
  var outputType = document.getElementById('output').value;
  var active = [];

  function titleCase(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
  }

  function formatPreview(start) {
    var activeSection = "";

    return active.reduce(function(prev, curr, idx){
      var currentSection = curr[1].split("-")[0];
      var str = "";
      if (activeSection !== currentSection) {
        activeSection = currentSection;
        str = "## " + titleCase(currentSection);
      }

      str = str + start + curr[0];

      if (outputType !== "plaintext") {
        str = str + " (More Info)[" + window.location.href + "#" + curr[1] + "]";
      }

      return idx > 0 ?  prev + str : str;
    }, active[0]);
  }

  function outputPreview() {
    if (!active.length) { return false;}
    textarea.value = formatPreview(formatters[outputType]);
  }

  function rebuildActive() {
    var newActive = [];
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
