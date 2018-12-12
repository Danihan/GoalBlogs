const showdown = require('showdown')
const showdownConverter = new showdown.Converter()

class CommentService {
  constructor ({ commentRepo }) {
    this._commentRepo = commentRepo
  }

  async renderContent (content) {
    return showdownConverter.makeHtml(content)
  }

  async getPostComments (postId) {
    return this._commentRepo.find({ postId })
  }
}

module.exports = CommentService
