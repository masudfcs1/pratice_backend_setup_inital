import { Router } from 'express';
import { UploadController } from './upload.controller';
import { upload } from '../../middleware/upload';
import { authMiddleware } from '../../middleware/auth';

const router = Router();
const uploadController = new UploadController();

router.post('/single', authMiddleware, upload.single('image'), uploadController.uploadSingle);
router.post('/multiple', authMiddleware, upload.array('images', 10), uploadController.uploadMultiple);

export default router;
