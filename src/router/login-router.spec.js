const LoginRouter = require('./login_router')
const MissingParamError = require('../presentation/helpers/missing-param-error.js')

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
