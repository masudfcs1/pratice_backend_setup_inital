import { Request, Response } from 'express';

export class UploadController {
  uploadSingle = async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const fileUrl = `/uploads/${req.file.filename}`;
      res.status(200).json({
        message: 'File uploaded successfully',
        url: fileUrl,
        filename: req.file.filename
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  uploadMultiple = async (req: Request, res: Response) => {
    try {
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
      }

      const fileUrls = req.files.map(file => ({
        url: `/uploads/${file.filename}`,
        filename: file.filename
      }));

      res.status(200).json({
        message: 'Files uploaded successfully',
        files: fileUrls
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
