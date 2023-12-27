import { AppDataSource } from "../database/data-source";
import { Request, Response } from "express";
import { Author } from "../entities/Author";
import { ResponseUtil } from "../utils/Response";
import { Paginator } from "../database/Paginator";
import { CreateAuthorDTO } from "../dtos/CreateAuthorDTO";
import { validate, validateOrReject } from "class-validator";

export class AuthorsController {
    async getAuthors(req: Request, res: Response): Promise<Response>  {
        const builder = await AppDataSource
            .getRepository(Author)
            .createQueryBuilder()
            .orderBy('id', 'DESC');
        const { records: authors, paginationInfo } = await Paginator.paginate(builder, req);
        return ResponseUtil.sendResponse(res, 'Fetched authors successfully', authors, paginationInfo)
    }

    async getAuthor(req: Request, res: Response): Promise<Response> {
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

    async create(req: Request, res: Response): Promise<Response>  {
        const authorData = req.body;

        authorData.image = req.file?.filename;
        
        const dto = new CreateAuthorDTO();
        Object.assign(dto, authorData);

        const errors = await validate(dto);
        if (errors.length > 0) {
            return ResponseUtil.sendError(res, 'Invalid data', 422, errors);
        }

        const repo = AppDataSource.getRepository(Author);
        const author = repo.create(authorData);
        await repo.save(author);
        return ResponseUtil.sendResponse(res, 'Create new author successfully', author, 200, undefined);
    }
}

