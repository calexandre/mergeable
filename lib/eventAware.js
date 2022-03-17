class EventAware {
  /**
   * @param eventName
   *  An event name to be evaluated for support. The name is as in the GitHub
   *  webhook format of issues.opened, pull_request.opened, etc
   *
   * @return boolean true if the EventAware object supports the event. i.e. issues.opened
   */
  isEventSupported (eventName) {
    const eventObject = eventName.split('.')[0]
    const relevantEvent = this.supportedEvents.filter(event => event.split('.')[0] === eventObject || event === '*')
    return relevantEvent.indexOf('*') > -1 ||
      relevantEvent.indexOf(`${eventObject}.*`) > -1 ||
      relevantEvent.indexOf(eventName) > -1
  }

  getPayload (context, allPayload) {
    if (allPayload) {
      return context.payload
    }

    switch (context.eventName) {
      case 'issues': // event name is 'issues' but payload contain 'issue'
        return context.payload.issue
      case 'pull_request_review':
        return context.payload.pull_request
      case 'issue_comment': // event name is 'issue_comment' but payload contain 'comment'
        if (!context.payload.comment.number) {
          context.payload.comment.number = context.payload.issue.number // dirty fix to ensure compatibility with issue related operations
        }
        return context.payload.comment
      default:
        return context.payload[context.eventName]
    }
  }
}

module.exports = EventAware
