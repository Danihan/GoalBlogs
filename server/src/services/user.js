class UserService {
  constructor ({ userRepo }) {
    this._userRepo = userRepo
  }

  async getProfileByUserId (id) {
    return this._userRepo.findById(id)
  }
}

module.exports = UserService
