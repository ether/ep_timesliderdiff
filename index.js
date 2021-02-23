'use strict';

const eejs = require('ep_etherpad-lite/node/eejs');

exports.eejsBlock_timesliderEditbarRight = (hook_name, args, cb) => {
  args.content += eejs.require('ep_timesliderdiff/templates/timesliderDiff.ejs');
  cb();
};

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
