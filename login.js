import express from 'express'
import mongoose from 'mongoose'

const Router = express.Router()

module.exports = () => {
  const router = new SignUpRouter()
  Router.post('/signup', ExpressRouterAdapter.adapt(router))
}

class ExpressRouterAdapter {
  static adapt (router) {
    return async (req, res) => {

    }
  }
}

class SignUpRouter {
  async route (httpRequest) {
    const { email, password, repeatPassword } = httpRequest.body
    const user = new SignUpUseCase().signUp(email, password, repeatPassword)
    return { // este ojeto é um http response, uma resposta customizada
      statusCode: 200,
      body: user
    }
  }
}

class SignUpUseCase {
  async signUp (email, password, repeatPassword) {
    if (password === repeatPassword) {
      const user = await AddAccountRepository.create({ email, password })
      return user
    }
  }
}

const AccountModel = mongoose.model('Account')
class AddAccountRepository {
  async signUp (email, password, repeatPassword) {
    if (password === repeatPassword) {
      const user = await AccountModel.create({ email, password })
      return user
    }
  }
}
