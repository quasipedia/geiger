# Atom Beta Notifier

This package checks what the latest pre-release (beta) version of Atom is, and
notify the user if the latest beta is ahead of the version currently being used.

![Atom Beta Notifier in action](screenshot-info.png)

![Atom Beta Notifier in action](screenshot-error.png)


## Under the hood

This package downloads the relase information about Atom via the GitHub API.  It
then compares the latest pre-release tag (beta) with the tag of the version
currently being used, and notify the user of what the latest beta is.

The notification type (info, warning, error) is dependant of the relationship
between the current running instance of Atom and the latest [pre-]releases on
GitHub.

- If you are running a stable version of Atom, newer betas trigger a warning
- If you are running a beta version of Atom, newer betas trigger an error
- If you are running a beta version of Atom, a newer stable triggers an error
- All other cases trigger a simple info

Since this package has been developed to get around manually checking for new
beta releases for linux users, the version number of the latest beta is a
clickable link to the RPM download page (as the author uses Fedora).


## Triggers

The package check for new version of Atom at launch, but it is possible to
manually perform the check via command palette (search for `beta check`) or the
`Package` menu directly.


## Known limitations

- The GitHub API is throttled.  If you check for updates more than 60 times per
  hour, the check may fail.
- The fact that there is a tag for a new release in the Atom repo does not
  automatically mean that the new version is already available for download.


## To do
- [ ] Support links to other packages types (`deb`, for example)
- [ ] Write tests
