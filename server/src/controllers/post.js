class PostController {
  constructor ({ postService, commentService }) {
    this._postService = postService
    this._commentService = commentService
  }

  async listPosts () {
    return this._postService.listPosts()
  }

  async viewPost (id, slug) {
    const [post, comments] = await Promise.all([ this._postService.viewPost(id, slug), this._commentService.getPostComments(id) ])

    return { post, comments }
  }

  async createPost (user, title, content, status) {
    const { id, slug } = await this._postService.createPost(user, title, content, status)

    return this.getPostForEditing(id, slug)
  }

  async getPostForEditing (user, id, slug) {
    const post = await this._postService.getPostForEditing(user, id, slug)

    return post
  }

  async updatePost (user, id, slug, title, content, status) {
    const success = await this._postService.updatePost(user, id, slug, title, content, status)

    if (!success) {
      return false
    }

    return this.getPostForEditing(id, slug)
  }
}

module.exports = PostController
