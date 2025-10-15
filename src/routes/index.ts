import { Router } from 'express';
import userRoutes from '../modules/user/user.routes';
import blogRoutes from '../modules/blog/blog.routes';
import uploadRoutes from '../modules/upload/upload.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/upload', uploadRoutes);

export default router;
