const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const bcryptHashPromisified = promisify(bcrypt.hash.bind(bcrypt))

class AuthService {
  constructor ({ userRepo, secret }) {
    this._userRepo = userRepo
    this._secret = secret
  }

  async hashPassword (password) {
    return bcryptHashPromisified(password, 10)
  }

  async generateToken (user) {
    const token = jwt.sign({ userId: user.id }, this._secret)
    return token
  }

  async verifyToken (token) {
    try {
      const decoded = jwt.verify(token, this._secret)
      const user = await this._userRepo.findById(decoded.userId)

      if (!user) {
        // TODO: Error
        return false
      }

      return user
    } catch (err) {
      // TODO: Handle error
      return false
    }
  }

  async loginWithEmailAndPassword ({ email, password }) {
    const user = await this._userRepo.findOne({ email })
    if (!user) {
      // TODO: Error
      return false
    }

    // TODO: Promisify
    const passwordOk = bcrypt.compareSync(password, user.password)
    if (!passwordOk) {
      // TODO: Error
      return false
    }

    const token = await this.generateToken(user)

    return token
  }

  async registerWithEmailAndPassword ({ email, password }) {
    const hashedPassword = await this.hashPassword(password)

    const userCheckEmail = await this._userRepo.findOne({ email })
    if (userCheckEmail) {
      // TODO: Error
      return false
    }

    await this._userRepo.insert({ email, password: hashedPassword })

    return true
  }
}

module.exports = AuthService
