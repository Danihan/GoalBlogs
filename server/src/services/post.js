class PostService {
  constructor ({ postRepo }) {
    this._postRepo = postRepo
  }

  async viewPost (slug, id) {
    return this._postRepo.findOne({ id, slug })
  }
}

module.exports = PostService
