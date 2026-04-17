'use strict';

const assert = require('assert').strict;
const plugin = require('../../../..');

describe(__filename, function () {
  it('emits the diff button in a writable timeslider', function (done) {
    const args = {content: '', renderContext: {isReadOnly: false}};
    plugin.eejsBlock_timesliderEditbarRight('eejsBlock_timesliderEditbarRight', args, () => {
      assert(args.content.includes('updateDiffView'),
          `expected diff button to be emitted, got: ${args.content}`);
      done();
    });
  });

  it('does not emit the diff button in read-only mode (regression for #4)', function (done) {
    const args = {content: '', renderContext: {isReadOnly: true}};
    plugin.eejsBlock_timesliderEditbarRight('eejsBlock_timesliderEditbarRight', args, () => {
      assert.equal(args.content, '',
          `expected no button output in read-only mode, got: ${args.content}`);
      done();
    });
  });

  it('still works when renderContext is missing', function (done) {
    const args = {content: ''};
    plugin.eejsBlock_timesliderEditbarRight('eejsBlock_timesliderEditbarRight', args, () => {
      assert(args.content.includes('updateDiffView'));
      done();
    });
  });
});
