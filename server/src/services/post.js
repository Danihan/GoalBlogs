const showdown = require('showdown')
const slugify = require('slugify')

const showdownConverter = new showdown.Converter()

class PostService {
  constructor ({ postRepo }) {
    this._postRepo = postRepo
  }

  async renderContent (content) {
    return showdownConverter.makeHtml(content)
  }

  async viewPost (slug, id) {
    const post = await this._postRepo.findOne({ id, slug })

    if (!post) {
      return null
    }

    const renderedContent = await this.renderContent(post.content)
    post.content = renderedContent

    return post
  }

  async listPosts () {
    const posts = await this._postRepo.getLatestPublishedPosts()

    for (const post of posts) {
      post.content = await this.renderContent(post.content)
    }

    return posts
  }

  async getPostForEditing (slug, id) {
    const post = await this._postRepo.findOne({ id, slug })

    if (!post) {
      return null
    }

    return post
  }

  async createPost (user, title, content, status) {
    const slug = slugify(title, { lower: true })

    const post = {
      userId: user.id,
      status,
      title,
      content,
      slug
    }

    if (status === 'published') {
      post.publishedAt = this._postRepo.timestampNow()
    }

    const [ createdPostId ] = await this._postRepo.insert(post)

    return this.getPostForEditing(slug, createdPostId)
  }

  async updatePost (user, slug, id, title, content, status) {
    const post = await this._postRepo.findOne({ id, slug, userId: user.id })

    if (!post) {
      return false
    }

    const update = { title, content, status }

    if (post.status === 'published' && !post.publishedAt) {
      update.publishedAt = this._postRepo.timestampNow()
    }

    await this._postRepo.update({ slug, id }, update)

    return true
  }
}

module.exports = PostService
