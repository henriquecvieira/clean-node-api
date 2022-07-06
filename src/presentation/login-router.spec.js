class LoginRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return {
        statusCode: 500
      }
    }
    const { email, password } = httpRequest.body
    if (!email || !password) {
      return HttpResponse.badRequest('email')
    }
  }
}

class HttpResponse {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static serverError () {
    return {
      statusCode: 500
    }
  }
}
class MissingParamError extends Error {
  constructor (paramName) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}

describe('Login Router', () => {
  test('should return 400 if email is not provided', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})

test('should return 400 if password is not provided', () => {
  const sut = new LoginRouter()
  const httpRequest = {
    body: {
      email: 'any_email@email.com'
    }
  }
  const httpResponse = sut.route(httpRequest)
  expect(httpResponse.statusCode).toBe(400)
})
test('should return 500 if httpRequest is not provided', () => {
  const sut = new LoginRouter()
  const httpResponse = sut.route()
  expect(httpResponse.statusCode).toBe(500)
})
test('should return 500 if httpRequest has no body', () => {
  const sut = new LoginRouter()
  const httpRequest = {}
  // ou ode ser passado com uma linha de código ficando como abaixo comentado:
  // const httpResponse = sut.route({})
  const httpResponse = sut.route(httpRequest)
  expect(httpResponse.statusCode).toBe(500)
})
