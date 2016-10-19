'use babel'

import { CompositeDisposable } from 'atom'
import semver from 'semver'
import shell from 'shell'
import { defaults } from './config'

const apiReleasesURL = 'http://api.github.com/repos/atom/atom/releases'
const downloadURL = 'https://atom.io/download/rpm?channel=beta'
const currentVersion = atom.getVersion()

var timestampLastCheck

const parseGithubApiLatestChannelVersions = (payload) => {
  let channels = {}

  let stablePayload = payload.filter(release => !release.prerelease)[0]
  channels.stable = {
    version:  stablePayload.tag_name,
    html_url: stablePayload.html_url
  }

  let betaPayload = payload.filter(release => release.prerelease)[0]
  channels.beta = {
    version:  betaPayload.tag_name,
    html_url: betaPayload.html_url
  }

  return channels
}

const openUrl = (url) => {
  shell.openExternal(url)
}

const notify = (channels) => {
  let latestVersion = channels.stable.version
  const considerBeta = atom.config.get('geiger.beta.include')
  const msgLines = [
    `You are running version ${currentVersion}`,
    `Latest stable is ${channels.stable.version}`
  ]

  // Apply "include Beta" setting flag
  if (considerBeta) {
    latestVersion = semver.gt(channels.beta.version, channels.stable.version) ? channels.beta.version : channels.stable.version
    msgLines.push(`Latest beta is ${channels.beta.version}`)
  }

  // Up-to-date
  if (semver.gte(currentVersion, latestVersion)) {
    if (atom.config.get('geiger.upToDate.notify')) {
      atom.notifications.addInfo(
        'Your version of Atom is <strong>UP-TO-DATE</strong>.',
        {
          detail: msgLines.join('\n'),
          dismissable: atom.config.get('geiger.upToDate.dismiss')
        }
      )
    }

  // Outdated
  } else {
    if (atom.config.get('geiger.outdated.notify')) {
      let buttons = [
        {
          text: `View Stable Release`,
          onDidClick: () => {
            openUrl(channels.stable.html_url)
            notification.dismiss()
          }
        }
      ]
      if (considerBeta) {
        buttons.push(
          {
            text: `View Beta Release`,
            onDidClick: () => {
              openUrl(channels.beta.html_url)
              notification.dismiss()
            }
          }
        )
      }

      let notification = atom.notifications.addWarning(
        'Your version of Atom is <strong>OUTDATED</strong>.',
        {
          detail: msgLines.join('\n'),
          dismissable: atom.config.get('geiger.outdated.dismiss'),
          buttons: buttons
        }
      )
    }
  }
  timestampLastCheck = Date.now()
}

export default {

  atomBetaNotifierView: null,
  modalPanel: null,
  subscriptions: null,

  config: defaults,

  activate(state) {
    // Establish when the last check has been performed
    // FIXME: emergechy patch, fix in a cleverer way the try-catch loop here
    try {
      timestampLastCheck = JSON.parse(state).timestampLastCheck
    } catch(err) {
      timestampLastCheck = 0
    }

    // Add commands to the workspace
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'geiger:check': () => this.check()
    }))

    // Perform the bootCheck only if settings say so and cooldown is over
    const bc = atom.config.get('geiger.bootCheck')
    if (bc.perform && (Date.now() - timestampLastCheck > bc.throttle * 60000 )) {
      this.check()
    }
  },

  serialize() {
    return JSON.stringify({timestampLastCheck})
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  check() {
    fetch(apiReleasesURL)
      .then(response => response.json())
      .then(parseGithubApiLatestChannelVersions)
      .then(notify)
      .catch(error => console.error('Error while fetching released from GitHub', error))
  }

}
