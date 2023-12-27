import express from 'express';
import { AuthorsController } from '../controllers/AuthorsController';
import { ErrorHandler } from '../utils/ErrorHandler';

const router = express.Router();

const authorsContoller = new AuthorsController();

router.get('/', ErrorHandler.handleErrors(authorsContoller.getAuthors));

router.get('/:id', ErrorHandler.handleErrors(authorsContoller.getAuthor));

export default router;