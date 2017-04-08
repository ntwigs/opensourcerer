import rp from 'request-promise'

const redirect = replace => {
  replace({
    pathname: '/'
  })
}

const redirectNoToken = (jwt, callback, replace) => {
  if (!jwt) {
    redirect(replace)
    callback()
  }
}

const validateExistingToken = async (jwt, callback, replace) => {
  try {

    const validationResult = await rp('http://localhost:3000/validate', {
      headers: {
        Authorization: `Bearer ${ jwt }`
      }
    })

    if (!validationResult) {
      localStorage.removeItem('jwt')
      redirect(replace)
    }

    callback()
  } catch(error) {
    console.log(error)
  }
}

export default async (nextstate, replace, callback) => {
  const jwt = localStorage.getItem('jwt')
  redirectNoToken(jwt, callback, replace)
  await validateExistingToken(jwt, callback, replace)
}