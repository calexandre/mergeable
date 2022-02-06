const { Validator } = require('./validator')

class Comment extends Validator {
  constructor () {
    super('comment')
    this.supportedEvents = [
      'issue_comment.*'
    ]
    this.supportedSettings = {
      no_empty: {
        enabled: 'boolean',
        message: 'string'
      },
      must_include: {
        regex: ['string', 'array'],
        regex_flag: 'string',
        message: 'string'
      },
      must_exclude: {
        regex: ['string', 'array'],
        regex_flag: 'string',
        message: 'string'
      },
      begins_with: {
        match: ['string', 'array'],
        message: 'string'
      },
      ends_with: {
        match: ['string', 'array'],
        message: 'string'
      }
    }
  }

  async validate (context, validationSettings) {
    const comment = this.getPayload(context).comment

    return this.processOptions(
      validationSettings,
      comment
    )
  }
}

module.exports = Comment
