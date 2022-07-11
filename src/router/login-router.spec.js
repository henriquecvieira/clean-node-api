const LoginRouter = require('./login_router')
const MissingParamError = require('../presentation/helpers/missing-param-error.js')
const UnauthorizedError = require('../presentation/helpers/unauthorized-error')

const makeSut = () => {
  class AuthUseCaseSpy {
    auth (email, password) {
      this.email = email
      this.password = password
    }
  }
  const authUseCaseSpy = new AuthUseCaseSpy()
  const sut = new LoginRouter(authUseCaseSpy)
  return {
    sut,
    authUseCaseSpy
  }
}

describe('Login Router', () => {
  test('should return 400 if email is not provided', () => {
    const { sut } = makeSut()
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
  const { sut } = makeSut()
  const httpRequest = {
    body: {
      email: 'any_email@email.com'
    }
  }
  const httpResponse = sut.route(httpRequest)
  expect(httpResponse.statusCode).toBe(400)
})
test('should return 500 if httpRequest is not provided', () => {
  const { sut } = makeSut()
  const httpResponse = sut.route()
  expect(httpResponse.statusCode).toBe(500)
})
test('should return 500 if httpRequest has no body', () => {
  const { sut } = makeSut()
  const httpRequest = {}
  // ou ode ser passado com uma linha de código ficando como abaixo comentado:
  // const httpResponse = sut.route({})
  const httpResponse = sut.route(httpRequest)
  expect(httpResponse.statusCode).toBe(500)
})
test('should call AuthUseCaseSpy with correct params', () => {
  const { sut, authUseCaseSpy } = makeSut()
  const httpRequest = {
    body: {
      email: 'any_email@email.com',
      password: 'any_password'
    }
  }

  sut.route(httpRequest)
  expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
  expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
})
test('should return 401 when invalid credentials are provided', () => {
  const { sut } = makeSut()
  const httpRequest = {
    body: {
      email: 'any_email@email.com',
      password: 'invalid_password'
    }
  }
  sut.route(httpRequest)
  const httpResponse = sut.route(httpRequest)
  expect(httpResponse.statusCode).toBe(401)
  expect(httpResponse.body).toEqual(new UnauthorizedError('password'))
})
