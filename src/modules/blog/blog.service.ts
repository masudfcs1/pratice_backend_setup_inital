import { BlogRepository } from './blog.repository';

export class BlogService {
  private blogRepository: BlogRepository;

  constructor() {
    this.blogRepository = new BlogRepository();
  }

  async createBlog(title: string, content: string, authorId: string, image?: string) {
    return await this.blogRepository.create({ title, content, image, authorId });
  }

  async getAllBlogs() {
    return await this.blogRepository.findAll();
  }

  async getBlogById(id: string) {
    const blog = await this.blogRepository.findById(id);
    if (!blog) {
      throw new Error('Blog not found');
    }
    return blog;
  }

  async getBlogsByAuthor(authorId: string) {
    return await this.blogRepository.findByAuthorId(authorId);
  }

  async updateBlog(id: string, authorId: string, data: { title?: string; content?: string; image?: string }) {
    const blog = await this.blogRepository.findById(id);
    if (!blog) {
      throw new Error('Blog not found');
    }
    if (blog.authorId !== authorId) {
      throw new Error('Unauthorized to update this blog');
    }
    return await this.blogRepository.update(id, data);
  }

  async deleteBlog(id: string, authorId: string) {
    const blog = await this.blogRepository.findById(id);
    if (!blog) {
      throw new Error('Blog not found');
    }
    if (blog.authorId !== authorId) {
      throw new Error('Unauthorized to delete this blog');
    }
    return await this.blogRepository.delete(id);
  }
}
