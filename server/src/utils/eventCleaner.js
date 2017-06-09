import rp from 'request-promise'

// TODO: Fixa användarnamn till porträtt, visningen av länken

export default async event => {
  if (event.payload.pull_request) {
    console.log(event.payload.pull_request.user)
  }
  try {
    switch(event.type) {
      case 'IssuesEvent':
        return normalizedEvent(
          event,
          'Issue',
          event.payload.action,
          125,
        )
      case 'IssueCommentEvent':
        return normalizedEvent(
          event,
          'Issue Comment',
          event.payload.action,
          75,
        )
      case 'PushEvent':
        return normalizedEvent(
          event,
          'Push',
          'To Repo',
          25 * event.payload.commits.length,
        )
      case 'PublicEvent':
        return normalizedEvent(
          event,
          'Repo',
          'Public',
          500,
        )
      case 'PullRequestEvent':
        return normalizedEvent(
          event,
          'Pull Request',
          event.payload.action,
          200,
        )
      case 'ForkEvent': 
        return normalizedEvent(
          event,
          'Forked',
          event.payload.forkee.name,
          50,
        )
      case 'PullRequestReviewCommentEvent':
        return normalizedEvent(
          event,
          'Review Comment',
          event.payload.action,
          75,
        )
      case 'CreateEvent':
        return normalizedEvent(
          event,
          'Created',
          'Repo',
          175,
        )
      case 'WatchEvent':
        return normalizedEvent(
          event,
          'Watching',
          'Repo',
          15,
        )
      case 'DeleteEvent':
        return normalizedEvent(
          event,
          'Deleted',
          event.payload.ref_type,
          5,
        )
      case 'ReleaseEvent':
        return normalizedEvent(
          event,
          'Released',
          'Repo',
          150,
        )
      case 'MemberEvent':
        return normalizedEvent(
          event,
          event.payload.member.login,
          event.payload.action,
          25,
        )
      case 'GollumEvent':
        return normalizedEvent(
          event,
          'Wiki',
          event.payload.pages[0].action,
          25,
        )
    }
  } catch(error) {
    console.log(error)
  }
}

const normalizedEvent = async (event, name, action, experience) => ({
    name, action, experience,
    avatar: await getAvatar(event),
    url: getUrl(event),
    username: getName(event)
})

const getUrl = event =>
  event.payload.issue ?
    event.payload.issue.html_url :
    `https://github.com/${ event.repo.name }`

const getName = event => 
  event.payload.issue ?
    event.payload.issue.html_url.split('/')[3] :
    event.repo.name.split('/')[1]

const getAvatar = async event => {
  try {
    if (event.org) {
      return event.org.avatar_url
    } else if (event.payload.issue) {
      return event.payload.issue.user.avatar_url
    } else if (event.payload.pull_request) {
      return event.payload.pull_request.base.user.avatar_url
    } else if (event.payload.member) {
      return event.payload.member.avatar_url
    } else if (event.type === 'WatchEvent'  ||
               event.type === 'PushEvent'   ||
               event.type === 'ForkEvent'   ||
               event.type === 'ReleaseEvent') {

      const repoOwner = event.repo.name.split('/').shift()
      
      if (event.actor.login === repoOwner) {
        return event.actor.avatar_url
      }

      return await getRepoAvatar(event.repo.url)
    } else {
      return event.actor.avatar_url
    }
  } catch(error) {
    console.log(error)
  }
}

const getRepoAvatar = async url => {
  const repoJSON = await rp(url, {
    headers: {
      'User-Agent': 'NorthernTwig'
    },
    json: true
  })

  return repoJSON.owner.avatar_url
}