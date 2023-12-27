import { AppDataSource } from "../database/data-source";
import { Request, Response } from "express";
import { Author } from "../entities/Author";
import { ResponseUtil } from "../utils/Response";
import { Paginator } from "../database/Paginator";

export class AuthorsController {
    async getAuthors(req: Request, res: Response) {
        const builder = await AppDataSource
            .getRepository(Author)
            .createQueryBuilder()
            .orderBy('id', 'DESC');
        const { records: authors, paginationInfo } = await Paginator.paginate(builder, req);
        return ResponseUtil.sendResponse(res, 'Fetched authors successfully', authors, paginationInfo)
    }

    async getAuthor(req: Request, res: Response) {
        const { id } = req.params;
        const author = await AppDataSource.getRepository(Author).findOneByOrFail({
            id: Number(id)
        });
        return ResponseUtil.sendResponse<Author>(
            res,
            'Fetch author successfully',
            author
        );

    }
}

