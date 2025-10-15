import { Router } from 'express';
import { BlogController } from './blog.controller';
import { authMiddleware } from '../../middleware/auth';

const router = Router();
const blogController = new BlogController();

router.post('/', authMiddleware, blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.get('/my-blogs', authMiddleware, blogController.getMyBlogs);
router.get('/:id', blogController.getBlogById);
router.put('/:id', authMiddleware, blogController.updateBlog);
router.delete('/:id', authMiddleware, blogController.deleteBlog);

export default router;
