# Geiger
**(previously known as 'atom-beta-notifier')**

A platform-independent (Linux, Windows, etc...) package for being notified
about newer-than-currently-in-use versions of Atom.

![Atom Beta Notifier: all is good](https://github.com/quasipedia/geiger/raw/master/screenshots/do-update.png)

![Atom Beta Notifier: you are missing out!](https://github.com/quasipedia/geiger/raw/master/screenshots/all-is-good.png)


## Why does this package exists?

Because if you use the **beta releases** of Atom, or if you are a **Linux** user,
the default notification system may not work for you.

If you have less hacker-like Atom usage patterns, this package may add no value
to your workflow.


## Under the hood

This package downloads the release information about Atom via the **GitHub API**
(this is what it makes it platform-independent, BTW).

Based on your configuration settings the package may then notify you of newer
stable or beta versions, or even just informing you are fully up-to-date.


## Usage

The package checks for new version of Atom at launch, but it is possible to
manually perform the check via command palette (search for `geiger`) or the
`Package` menu directly.

The boot check can be disabled entirely from the settings.


## Known limitations

- The GitHub API is throttled.  If you check for updates more than 60 times per
  hour, subsequent checks won't work.  Seriously though... 60 times per hour?
  Are you that impatient?!
- The fact that there is a tag for a new release in the Atom repo does not
  automatically mean that the new version is _already_ available for download.
  It _eventually_ will be, though, so check back after a couple of hours or so
  if that happens to you.


## Why "geiger"?

Short version: because I am a nerd.

Longer version: because in nature atoms decay over time, transforming themselves
into other elements and generating ionizing particles that can be picked up by a
[geiger counter][1].  If an outdated Atom version has "decayed", this package
should detect it! ;)


## Contributors

Also contributed to the geiger: @skyrpex @XanderXAJ


## To do
- Improve notification look and functionality
- Write tests

[1]: https://en.wikipedia.org/wiki/Geiger_counter
