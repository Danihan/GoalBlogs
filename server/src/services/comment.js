const showdown = require('showdown')
const showdownConverter = new showdown.Converter()

class CommentService {
  constructor ({ commentRepo }) {
    this._commentRepo = commentRepo
  }

  async renderContent (content) {
    return showdownConverter.makeHtml(content)
  }

  async renderComment (comment) {
    comment.content = await this.renderContent(comment.content)

    return comment
  }

  async getCommentById (id) {
    const comment = await this._commentRepo.findById(id)

    const commentRendered = await this.renderComment(comment)

    return commentRendered
  }

  async getPostComments (postId) {
    const comments = await this._commentRepo.find({ postId })

    const commentsRendered = await Promise.all(comments.map(comment => this.renderComment(comment)))

    return commentsRendered
  }

  async createComment (user, postId, postSlug, content) {
    const comment = {
      userId: user.id,
      postId,
      content
    }

    const [ createdPostId ] = await this._commentRepo.insert(comment)

    return createdPostId
  }
}

module.exports = CommentService
