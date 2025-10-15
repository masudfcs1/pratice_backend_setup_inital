import { Request, Response } from 'express';
import { BlogService } from './blog.service';
import { AuthRequest } from '../../middleware/auth';

export class BlogController {
  private blogService: BlogService;

  constructor() {
    this.blogService = new BlogService();
  }

  createBlog = async (req: AuthRequest, res: Response) => {
    try {
      const { title, content, image } = req.body;
      const blog = await this.blogService.createBlog(title, content, req.userId!, image);
      res.status(201).json(blog);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getAllBlogs = async (req: Request, res: Response) => {
    try {
      const blogs = await this.blogService.getAllBlogs();
      res.status(200).json(blogs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getBlogById = async (req: Request, res: Response) => {
    try {
      const blog = await this.blogService.getBlogById(req.params.id);
      res.status(200).json(blog);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };

  getMyBlogs = async (req: AuthRequest, res: Response) => {
    try {
      const blogs = await this.blogService.getBlogsByAuthor(req.userId!);
      res.status(200).json(blogs);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  updateBlog = async (req: AuthRequest, res: Response) => {
    try {
      const { title, content, image } = req.body;
      const blog = await this.blogService.updateBlog(req.params.id, req.userId!, { title, content, image });
      res.status(200).json(blog);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  deleteBlog = async (req: AuthRequest, res: Response) => {
    try {
      await this.blogService.deleteBlog(req.params.id, req.userId!);
      res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
