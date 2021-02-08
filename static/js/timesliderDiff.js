'use strict';

const updateDiffView = () => {
  // get text HTML of latest revision
  let latestUrl = document.location.href.replace('/timeslider?', '/export/txt');
  latestUrl = latestUrl.replace('/timeslider', '/export/txt');
  const endUrl = $('#exportplaina').attr('href'); // the URL on focus
  let latestContents = '';

  if (latestContents === '') {
    $.get(latestUrl, (data) => {
      latestContents = data;
    });
  }
  $.get(endUrl, (targetContents) => {
    if (latestContents !== targetContents) {
      diffUsingJS(latestContents, targetContents);
    } else {
      $('#timesliderDiffOutput').html('Contents has not changed, move the slider and try again');
    }
  });

  return false;
};

$('#updateDiffInline').change(() => {
  updateDiffView();
});

/* global difflib */
const diffUsingJS = (latestContents, targetContents) => {
  const base = difflib.stringAsLines(latestContents);
  const newtxt = difflib.stringAsLines(targetContents);
  let inlineVal = $('#updateDiffInline').is(':checked');

  if (inlineVal) {
    inlineVal = 1;
  }

  const sm = new difflib.SequenceMatcher(base, newtxt);
  const opcodes = sm.get_opcodes();
  const diffoutputdiv = $('#timesliderDiffOutput');
  diffoutputdiv.html(''); // blank the value
  while (diffoutputdiv.firstChild) diffoutputdiv.removeChild(diffoutputdiv.firstChild);
  let contextSize = null;
  contextSize = contextSize ? contextSize : null;
  /* global diffview */
  diffoutputdiv.append(diffview.buildView({baseTextLines: base,
    newTextLines: newtxt,
    opcodes,
    baseTextName: 'Base Text',
    newTextName: 'New Text',
    contextSize,
    viewType: inlineVal})
  );

//  window.location = url + "#diff";
};
