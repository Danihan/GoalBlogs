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

  async renderPost (post) {
    post.content = await this.renderContent(post.content)
    return post
  }

  async viewPost (id, slug) {
    const post = await this._postRepo.findOne({ id, slug })

    if (!post) {
      return null
    }

    const postRendered = await this.renderPost(post)

    return postRendered
  }

  async listPosts () {
    const posts = await this._postRepo.getLatestPublishedPosts()

    const postsRendered = await Promise.all(posts.map(post => this.renderPost(post)))

    return postsRendered
  }

  async getPostForEditing (user, id, slug) {
    const post = await this._postRepo.findOne({ id, slug, userId: user.id })

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

    return { id: createdPostId, slug }
  }

  async updatePost (user, id, slug, title, content, status) {
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
