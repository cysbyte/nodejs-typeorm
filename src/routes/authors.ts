import express from 'express';
import { AuthorsController } from '../controllers/AuthorsController';
import { FileUploader } from '../middlewares/FileUploader';
import { ErrorHandler } from '../utils/ErrorHandler';

const router = express.Router();

const authorsContoller = new AuthorsController();

router.get('/', ErrorHandler.handleErrors(authorsContoller.getAuthors));

router.get('/:id', ErrorHandler.handleErrors(authorsContoller.getAuthor));

router.post('/',
    FileUploader.upload('image', 'authors', 2 * 1024 * 1024),
    ErrorHandler.handleErrors(authorsContoller.create)
);

export default router; 