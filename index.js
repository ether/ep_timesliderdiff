'use strict';

const {template} = require('ep_plugin_helpers');
const eejs = require('ep_etherpad-lite/node/eejs');

// The diff view relies on endpoints that the read-only timeslider cannot
// reach, so suppress the button entirely for read-only viewers (regression
// for #4). `renderContext.isReadOnly` is set by specialpages.ts when
// rendering `/p/:pad/timeslider`.
exports.eejsBlock_timesliderEditbarRight =
    template('ep_timesliderdiff/templates/timesliderDiff.ejs', {
      skip: (args) => args.renderContext && args.renderContext.isReadOnly,
    });

exports.eejsBlock_timesliderStyles = (hook_name, args, cb) => {
  args.content += '<link rel="stylesheet" ' +
  'href="/static/plugins/ep_timesliderdiff/static/css/diffview.css" type="text/css">';
  cb();
};

exports.eejsBlock_timesliderBody = (hook_name, args, cb) => {
  args.content += eejs.require('ep_timesliderdiff/static/js/difflib.js');
  args.content += eejs.require('ep_timesliderdiff/static/js/diffview.js');
  args.content += eejs.require('ep_timesliderdiff/templates/modal.ejs', {}, module);
  args.content += `<script type="text/javascript">
    ${eejs.require('ep_timesliderdiff/static/js/timesliderDiff.js')}
    </script>`;
  cb();
};
