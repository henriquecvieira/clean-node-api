import express from 'express'
import mongoose from 'mongoose'

const Router = express.Router()

module.exports = () => {
  const router = new SignUpRouter()
  Router.post('/signup', ExpressRouterAdapter.adapt(router))
  // o express espera uma função assincrona que recebe um request e uma response
}

class ExpressRouterAdapter {
  static adapt (router) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      }
      const httpResponse = router.route(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse.body)
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
// domain
// signup-usecase
class SignUpUseCase {
  async signUp (email, password, repeatPassword) {
    if (password === repeatPassword) {
      const user = await AddAccountRepository.create({ email, password })
      return user
    }
  }
}
// infra-layer
// add-account-repo
// import mongoose from 'mongoose'

const AccountModel = mongoose.model('Account')
class AddAccountRepository {
  async signUp (email, password, repeatPassword) {
    if (password === repeatPassword) {
      const user = await AccountModel.create({ email, password })
      return user
    }
  }
}

// teste para commit
