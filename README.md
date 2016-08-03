# Atom Beta Notifier

This package checks GitHub to verify what is the latest pre-release
(beta) version of atom, notifying the user if the latest beta is ahead
of the version of atom currently being used.

![Atom Beta Notifier in action](screenshot.png)


## What it does

This package check the tags on the Atom repository via GitHub API, and check
what the latest beta

The notification type (info, warning, error) is dependant of the relationship
between the current running instance of Atom and the latest [pre-]releases on
GitHub.

- If you are running a stable version of Atom, newer betas trigger a warning
- If you are running a beta version of Atom, newer betas trigger an error
- If you are running a beta version of Atom, a newer stable triggers an error
  (regardless of a newer beta being available or not)
- All other cases trigger a simple info

The version number of the latest beta is a clickable link to the download page.


## Triggers

The package check for new version of Atom at launch, but it is possible to
manually perform the check via command palette or the `Package` menu


## Known limitations

- The GitHub API is throttled.  If you check for updates more than 60 times per
  hour, the check may fail.
- The fact that there is a tag for a new release in the Atom repo does not
  automatically mean that the new version is already available for download.
- This is my first atom package ever... :blush:
