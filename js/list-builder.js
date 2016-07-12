function $$(sel) {
  // turn this into an array for easier loopability
  return Array.prototype.slice.call(document.querySelectorAll(sel));
}

new Clipboard('.c-guidelines__copy');

(function(container){ // write some JS

  if (!container) {
    return false;
  }

  var sections = {
    designers: "Designers",
    editorial: "Editorial",
    engineers: "Engineers",
    project: "Project Managers",
    qa: "Quality Assurance"
  }

  var formatters = {
    github: "\n- [ ] ",
    markdown: "\n - ",
    plaintext: "\n"
  };

  var checkboxes = $$('input[type="checkbox"]');
  var textarea = container.querySelector('.preview-box');
  var outputType;

  // An active element is an array of 2 strings
  // the first string is the list item text
  // the second string is the id of the label wrapping the checkbox
  var active = [];

  function saveActive() {
    var serialized = active.map(function(arr) {
      return arr.join("__");
    });

    localStorage.setItem('previewSelections', serialized.join('|'));
  }

  function retrieveActive() {
    var existing = localStorage.getItem('previewSelections');
    if (existing) {
      existing = existing.split('|').map(function(sel){
        return sel.split("__")
      });
    }

    return existing;
  }

  function highlightCheckboxes() {
    active.forEach(function(box){
      document.querySelector('#' + box[1] + ' input').checked = true;
    })
  }

  function formatPreview(start) {
    var activeSection = "";

    return active.reduce(function(prev, curr, idx){
      var currentSection = curr[1].split("-")[0];
      var str = "";

      if (activeSection !== currentSection ) {
        activeSection = currentSection;
        if (prev !== curr) {
          str = outputType === "plaintext" ? "\n\n" : "\n\n## ";
        } else {
          str = outputType === "plaintext" ? str : "## "
        }
        str += sections[activeSection];
      }

      str += start + curr[0];

      if (outputType !== "plaintext") {
        str = str + " [More Info](" + window.location.href + "#" + curr[1] + ")";
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
        // [description of the item, id for the label (for anchor links)]
        var deets = [c.parentNode.querySelector('p').innerText, c.parentNode.id]
        newActive.push(deets);
      }
    });
    active = newActive;
    saveActive();
    outputPreview();
  }

  $$('[name="output_type"]').forEach(function(input) {
    if (input.checked) {
      outputType = input.value;
    }

    input.addEventListener('change', function(ev) {
      outputType = ev.target.value;
      outputPreview();
    });
  });

  checkboxes = checkboxes.map(function(input) {
    if (input.getAttribute('data-skip')) {
      return false;
    }

    input.addEventListener('change', rebuildActive);
    return input;
  });

  // On init check localStorage to see if the person
  // has previously visited, if so return things
  // to the way they left things
  var previousSelections = retrieveActive();
  if (previousSelections) {
    active = previousSelections;
    highlightCheckboxes();
    outputPreview();
  }

 })(document.querySelector('.c-guidelines'))
