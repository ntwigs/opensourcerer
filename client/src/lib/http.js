import { FOR_DEV } from '../secret'
import rp from 'request-promise'

export const getEtag = async (username, etag) => await rp(`https://api.github.com/users/${ username }/events`, {
  method: 'HEAD',
  headers: {
    'If-None-Match': etag,
    Authorization: `Bearer ${ FOR_DEV }`
  },
  json: true,
  resolveWithFullResponse: true
})

export const getInitialEvents = async username => await rp(`http://localhost:3001/events/${ username }`, {
  method: 'GET',
  json: true
})

export const getNewEvents = async username => await rp(`http://localhost:3001/users/${ username }/levelup`, {
  method: 'GET',
  json: true
})

export const getEtagStatus = async (username, etag) => await rp(`http://localhost:3001/users/${ username }/${ etag }`, {
  method: 'GET',
  json: true
})

export const getUserInformation = async username => await rp(`http://localhost:3001/users/${ username }`, {
  json: true
})