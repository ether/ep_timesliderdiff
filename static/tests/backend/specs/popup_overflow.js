'use strict';

const assert = require('assert').strict;
const fs = require('fs');
const path = require('path');

const cssPath = path.resolve(__dirname, '..', '..', '..', '..', 'static', 'css', 'diffview.css');

describe(__filename, function () {
  let src;
  before(function () { src = fs.readFileSync(cssPath, 'utf8'); });

  it('clamps the diff popup to the viewport (#3)', function () {
    // Long pads previously pushed the popup beyond the viewport so the
    // inline checkbox + "try again" button got clipped. The popup has to
    // have both width and height caps and allow its own overflow so the
    // controls stay reachable.
    const popupBlock = src.match(
        /\.timesliderDiffSettings\.popup\.toolbar-popup\s*\{([\s\S]*?)\}/);
    assert(popupBlock, 'expected a rule block for .timesliderDiffSettings.popup.toolbar-popup');
    const body = popupBlock[1];
    assert(/max-width\s*:/.test(body), 'popup must declare max-width');
    assert(/max-height\s*:/.test(body), 'popup must declare max-height');
    assert(/overflow\s*:\s*auto/.test(body), 'popup must set overflow: auto so content scrolls');
  });

  it('does not leave a missing semicolon in the table.diff rule (#3)', function () {
    const rule = src.match(/table\.diff\s*\{([\s\S]*?)\}/);
    assert(rule, 'expected a rule for table.diff');
    // The original source had `white-space:pre-wrap` with no trailing
    // semicolon immediately followed by `height:400px;`, so the `height`
    // declaration was lost to a CSS parse error. Every declaration inside
    // the block must be terminated with ';'.
    const body = rule[1].trim();
    for (const line of body.split('\n').map((l) => l.trim()).filter(Boolean)) {
      assert(line.endsWith(';') || line.endsWith('{') || line.endsWith('}'),
          `every declaration in table.diff should end with a semicolon — saw: ${line}`);
    }
  });
});
