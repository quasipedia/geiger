'use babel'

import { CompositeDisposable } from 'atom'
import semver from 'semver'
import { defaults } from './config'

const apiReleasesURL = 'http://api.github.com/repos/atom/atom/releases'
const downloadURL = 'https://atom.io/download/rpm?channel=beta'
const currentVersion = atom.getVersion()

var timestampLastCheck

const notify = (payload) => {
  let latest
  const latestStable = payload.filter(release => !release.prerelease)[0].tag_name
  const msgLines = [
    `You are running version ${currentVersion}`,
    `Letest stable is ${latestStable}`
  ]

  // Apply "include Beta" setting flag
  if (atom.config.get('geiger.beta.include')) {
    const latestBeta = payload.filter(release => release.prerelease)[0].tag_name
    msgLines.push(`Letest beta is ${latestBeta}`)
    latest = semver.gt(latestBeta, latestStable) ? latestBeta : latestStable
  } else {
    latest = latestStable
  }

  // Up-to-date
  if (semver.gte(currentVersion, latest)) {
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
      atom.notifications.addWarning(
        'Your version of Atom is <strong>OUTDATED</strong>.',
        {
          detail: msgLines.join('\n'),
          dismissable: atom.config.get('geiger.outdated.dismiss')
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
      .then(json => notify(json))
      .catch(error => console.error('Error while fetching released from GitHub', error))
  }

}
