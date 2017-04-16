export default event => {
  switch(event.type) {
    case 'IssuesEvent':
      return {
        name: 'Issue',
        action: event.payload.action,
        experience: 175 
      }
    case 'IssueCommentEvent':
      return {
        name: 'Issue Comment',
        action: event.payload.action,
        experience: 175 
      }
    case 'PushEvent':
      return {
        name: 'Push',
        action: 'To Repo',
        experience: 25
      }
    case 'PublicEvent':
      return {
        name: 'Repo',
        action: 'Public',
        experience: 500
      }
    case 'PullRequestEvent':
      return {
        name: 'Pull Request',
        action: event.payload.action,
        experience: 200
      }
    case 'ForkEvent': 
      return {
        name: 'Forked',
        action: event.payload.forkee.name,
        experience: 50
      }
    case 'PullRequestReviewCommentEvent':
      return {
        name: 'Review Comment',
        action: event.payload.action,
        experience: 125
      }
  }
}