const showdown = require('showdown')

const showdownConverter = new showdown.Converter()

class PostService {
  constructor ({ postRepo }) {
    this._postRepo = postRepo
  }

  async renderContent (content) {
    return showdownConverter.makeHtml(content)
  }

  async viewPost (slug, id) {
    const post = this._postRepo.findOne({ id, slug })
    post.content = await this.renderContent(post.content)

    return post
  }
}

module.exports = PostService
