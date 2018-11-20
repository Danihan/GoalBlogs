class CommentService {
  constructor ({ commentRepo }) {
    this._commentRepo = commentRepo
  }

  async getPostComments (postId) {
    return this._commentRepo.find({ postId })
  }
}

module.exports = CommentService
