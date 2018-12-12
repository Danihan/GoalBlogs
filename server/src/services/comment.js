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
    const comments = await this._commentRepo.find({ postId })

    const commentsRendered = await Promise.all(comments.map(comment => this.renderContent(comment.content)))

    return commentsRendered
  }
}

module.exports = CommentService
