![Publish Status](https://github.com/ether/ep_timesliderdiff/workflows/Node.js%20Package/badge.svg) [![Backend Tests Status](https://github.com/ether/ep_timesliderdiff/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ether/ep_timesliderdiff/actions/workflows/test-and-release.yml)

# See changes between revisions in Etherpad timeslider

![Alt text](http://i.imgur.com/5dqPPFj.png)

NOTE: This is a prototype to show a way to implement this functionality.  This plugin needs rewriting if you want to use it in production.

Want to see what's been changed since you left?  If you want to see a Diff in pad please use ep_what_have_i_missed

Install via the /admin/plugins UI in Etherpad Lite.

# TODO

* Styling
* Update diff on slide
* Remember position user last was on pad and compare then to now
* Lots...
* Use SocketIO instead of AJAX (for streaming when searching through large pads)
* UI polishing
* Progress indicator
* Test coverage

## Installation

Install from the Etherpad admin UI (**Admin → Manage Plugins**,
search for `ep_timesliderdiff` and click *Install*), or from the Etherpad
root directory:

```sh
pnpm run plugins install ep_timesliderdiff
```

> ⚠️ Don't run `npm i` / `npm install` yourself from the Etherpad
> source tree — Etherpad tracks installed plugins through its own
> plugin-manager, and hand-editing `package.json` can leave the
> server unable to start.

After installing, restart Etherpad.
