var eejs = require('ep_etherpad-lite/node/eejs');

exports.eejsBlock_timesliderEditbarRight = function (hook_name, args, cb) {
  args.content = eejs.require("ep_timesliderdiff/templates/timesliderDiff.ejs") + args.content;
  return cb();
}

exports.eejsBlock_timesliderStyles = function (hook_name, args, cb) {
  args.content = args.content + "<link rel='stylesheet' href='/static/plugins/ep_timesliderdiff/static/css/diffview.css' type='text/css'>";
  return cb();
}

exports.eejsBlock_timesliderBody = function (hook_name, args, cb) {
  args.content = args.content + eejs.require("ep_timesliderdiff/static/js/difflib.js");
  args.content = args.content + eejs.require("ep_timesliderdiff/static/js/diffview.js");
  args.content = args.content + eejs.require("ep_timesliderdiff/static/js/timesliderDiff.js");
  args.content = args.content + eejs.require("ep_timesliderdiff/templates/modal.ejs", {}, module);
  return cb();
}

