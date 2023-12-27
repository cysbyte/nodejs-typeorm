import express from 'express';
import { AuthorsController } from '../controllers/AuthorsController';

const router = express.Router();

const authorsContoller = new AuthorsController();

router.get('/', authorsContoller.getAuthors);

router.get('/:id', authorsContoller.getAuthor);

export default router;