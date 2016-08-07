'use babel'

import { CompositeDisposable } from 'atom'
import semver from 'semver'
import { defaults } from './config'
console.log(defaults)

const apiReleasesURL = 'http://api.github.com/repos/atom/atom/releases'
const downloadURL = 'https://atom.io/download/rpm?channel=beta'
const currentVersion = 'v1.8.0' || atom.getVersion()

var timestampLastCheck

const notify = (payload) => {
  const latestBeta = payload.filter(release => release.prerelease)[0].tag_name
  const latestStable = payload.filter(release => !release.prerelease)[0].tag_name
  console.log(atom.config.get('geiger'));
  if (!atom.config.get('geiger.beta.include')) {
    newerVersions = newerVersions.filter(release => !release.prerelease)
  }
  return
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
  timestampLastCheck = Date.now()
}

export default {

  atomBetaNotifierView: null,
  modalPanel: null,
  subscriptions: null,

  config: defaults,

  activate(state) {
    console.log('STATE:', state)
    timestampLastCheck = state.timestampLastCheck || 0
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'geiger:check': () => this.check()
    }))
    const bc = atom.config.get('geiger.bootCheck')
    if (bc.perform && (Date.now() - timestampLastCheck > bc.throttle)) {
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
