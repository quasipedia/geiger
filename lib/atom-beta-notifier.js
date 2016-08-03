'use babel'

import { CompositeDisposable } from 'atom'
import semver from 'semver'

const apiReleasesURL = 'http://api.github.com/repos/atom/atom/releases'
const downloadURL = 'https://atom.io/download/rpm?channel=beta'

export default {

  atomBetaNotifierView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-beta-notifier:check': () => this.check()
    }))
    this.check()
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  notify(payload) {
    const currentVersion = atom.getVersion()
    const latestBeta = payload.filter(release => release.prerelease)[0].tag_name
    const latestStable = payload.filter(release => !release.prerelease)[0].tag_name
    const runningBeta = currentVersion.indexOf('beta') > 0
    const an = atom.notifications
    let showNotification = an.addInfo
    if (semver.gt(latestStable, currentVersion)) {
      showNotification = an.addError
    } else if (semver.gt(latestBeta, currentVersion)) {
      showNotification = runningBeta ? an.addError : an.addWarning
    }
    showNotification.call(
      an,
      `Latest beta is <a href=${downloadURL}><strong>${latestBeta}</strong></a>\n`,
      {
        detail: `You are running version ${currentVersion}\n` +
                `Letest stable is ${latestStable}`,
        dismissable: true,
      }
    )
  },

  check() {
    fetch(apiReleasesURL)
      .then(response => response.json())
      .then(json => this.notify(json))
      .catch(error => console.error('Error while fetching released from GitHub', error))
  }

}
