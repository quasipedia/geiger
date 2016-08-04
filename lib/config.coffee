module.exports =
  config:
    intialCheck:
      title: 'Boot check'
      type: 'object'
      properties:
        perform:
          title: 'Check for new releases at boot'
          type: 'boolean'
          default: 'true'
        throttle:
          title: 'Do not perform a new boot check before X minutes'
          type: 'integer'
          default: 60
          min: 0
          max: 1440
      order: 0
    monitoredReleases:
      title: 'Releases'
      description: 'Types of realeases'
      type: 'object'
      properties:
        stable:
          title: 'Check for newer stable releases'
          type: 'boolean'
          default: 'true'
          order: 0
        notifyOutdated:
          title: 'Check for newer beta releases'
          type: 'boolean'
          default: 'true'
          order: 1
      order: 1
    upToDate:
      title: 'When the system is up-to-date'
      type: 'object'
      properties:
        notify:
          title: 'Show a notification'
          type: 'boolean'
          default: 'true'
          order: 0
        dismissable:
          title: 'Require manual closing of notification'
          type: 'boolean'
          default: 'false'
          order: 1
      order: 2
    outdated:
      title: 'When there are new releases'
      type: 'object'
      properties:
        dismissable:
          title: 'Require manual closing of notification'
          type: 'boolean'
          default: 'true'
      order: 3
