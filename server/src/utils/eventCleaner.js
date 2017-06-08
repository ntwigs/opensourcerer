import rp from 'request-promise'

export default async event => {
  console.log(event, 'denna')
  try {
    switch(event.type) {
      case 'IssuesEvent':
        return {
          name: 'Issue',
          action: event.payload.action,
          experience: 125,
          avatar: await getAvatar(event),
          url: event.payload.issue ? event.payload.issue.html_url : `https://github.com/${ event.repo.name }` 
        }
      case 'IssueCommentEvent':
        return {
          name: 'Issue Comment',
          action: event.payload.action,
          experience: 75,
          avatar: await getAvatar(event),
          url: event.payload.issue ? event.payload.issue.html_url : `https://github.com/${ event.repo.name }` 
        }
      case 'PushEvent':
        return {
          name: 'Push',
          action: 'To Repo',
          experience: 25 * event.payload.commits.length,
          avatar: await getAvatar(event),
          url: event.payload.issue ? event.payload.issue.html_url : `https://github.com/${ event.repo.name }`          
        }
      case 'PublicEvent':
        return {
          name: 'Repo',
          action: 'Public',
          experience: 500,
          avatar: await getAvatar(event),
          url: event.payload.issue ? event.payload.issue.html_url : `https://github.com/${ event.repo.name }`          
        }
      case 'PullRequestEvent':
        return {
          name: 'Pull Request',
          action: event.payload.action,
          experience: 200,
          avatar: await getAvatar(event),
          url: event.payload.issue ? event.payload.issue.html_url : `https://github.com/${ event.repo.name }`        
        }
      case 'ForkEvent': 
        return {
          name: 'Forked',
          action: event.payload.forkee.name,
          experience: 50,
          avatar: await getAvatar(event),
          url: event.payload.issue ? event.payload.issue.html_url : `https://github.com/${ event.repo.name }`  
        }
      case 'PullRequestReviewCommentEvent':
        return {
          name: 'Review Comment',
          action: event.payload.action,
          experience: 75,
          avatar: await getAvatar(event),
          url: event.payload.issue ? event.payload.issue.html_url : `https://github.com/${ event.repo.name }`        
        }
      case 'CreateEvent':
        return {
          name: 'Created',
          action: 'Repo',
          experience: 175,
          avatar: await getAvatar(event),
          url: event.payload.issue ? event.payload.issue.html_url : `https://github.com/${ event.repo.name }`        
        }
      case 'WatchEvent':
        return {
          name: 'Watching',
          action: 'Repo',
          experience: 15,
          avatar: await getAvatar(event),
          url: event.payload.issue ? event.payload.issue.html_url : `https://github.com/${ event.repo.name }` 
        }
      case 'DeleteEvent':
        return {
          name: 'Deleted',
          action: event.payload.ref_type,
          experience: 5,
          avatar: await getAvatar(event),
          url: event.payload.issue ? event.payload.issue.html_url : `https://github.com/${ event.repo.name }`               
        }
      case 'ReleaseEvent':
        return {
          name: 'Released',
          action: 'Repo',
          experience: 150,
          avatar: await getAvatar(event),
          url: event.payload.issue ? event.payload.issue.html_url : `https://github.com/${ event.repo.name }`          
        }
      case 'MemberEvent':
        return {
          name: event.payload.member.login,
          action: event.payload.action,
          experience: 25,
          avatar: await getAvatar(event),
          url: event.payload.issue ? event.payload.issue.html_url : `https://github.com/${ event.repo.name }`
        }
      case 'GollumEvent':
        return {
          name: 'Wiki',
          action: event.payload.pages[0].action,
          experience: 25,
          avatar: await getAvatar(event),
          url: event.payload.issue ? event.payload.issue.html_url : `https://github.com/${ event.repo.name }`
        }
    }
  } catch(error) {
    console.log(error)
  }
}

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