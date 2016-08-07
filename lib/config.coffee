module.exports =
  defaults:
    bootCheck:
      title: 'Automatic check'
      type: 'object'
      properties:
        perform:
          title: 'Check for new releases when Atom is launched'
          type: 'boolean'
          default: 'true'
        throttle:
          title: 'Cooldown time'
          description: 'Prevents new boot checks if the last has been performed less than X minutes ago'
          type: 'integer'
          default: 60
          minimum: 0
          maximum: 1440
      order: 0
    beta:
      title: 'Beta channel'
      type: 'object'
      properties:
        include:
          title: 'Also consider beta releases as "newer version"'
          type: 'boolean'
          default: false
      order: 1
    upToDate:
      title: 'When Atom is up-to-date'
      type: 'object'
      properties:
        notify:
          title: 'Show a notification'
          type: 'boolean'
          default: 'true'
          order: 0
        dismiss:
          title: 'Require manual closing of notification'
          type: 'boolean'
          default: 'false'
          order: 1
      order: 2
    outdated:
      title: 'When there are new releases'
      type: 'object'
      properties:
        notify:
          title: 'Show a notification'
          type: 'boolean'
          default: 'true'
          order: 0
        dismiss:
          title: 'Require manual closing of notification'
          type: 'boolean'
          default: 'true'
      order: 3
