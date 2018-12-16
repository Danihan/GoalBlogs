class CommentController {
  constructor ({ commentService }) {
    this._commentService = commentService
  }

  async createComment (user, postId, postSlug, content) {
    const id = await this._commentService.createComment(user, postId, postSlug, content)

    return this._commentService.getCommentById(id)
  }
}

module.exports = CommentController
