//Servicio:canal de comunicacion directa entre el backend y la base de datos
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from 'src/shared/enums/repository.enum';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { response } from 'express';
import { PaginationDto } from '../dto/pagination/pagination.dto';
import { BookEntity } from '../entities/book.model';
import { ServiceResponseHttpModel } from 'src/shared/models/service-response-http.model';
import { CreateBookDto, FilterBookDto, UpdateBookDto } from '../dto';

@Injectable()
export class BookService {
    [x: string]: any;
    constructor(
        @Inject(RepositoryEnum.BOOK_REPOSITORY)
        private repository: Repository<BookEntity>,
    ) { }
    async create(payload: CreateBookDto): Promise<ServiceResponseHttpModel> {
        const newbook = this.repository.create(payload); 
        const bookCreated = this.repository.save(newbook); 
        return { data: plainToInstance(CreateBookDto, bookCreated) }; 
    }

    async catalogue(): Promise<ServiceResponseHttpModel> {
        const newEvent = this.repository.findAndCount({ take: 1000 });
        return {
            data: this.response[0],
            pagination: { totaItems: response[1], limit: 10 },
        };
    }

    //*Es asicrono cuando de vuelve una promesa
    async findAll(params?: FilterBookDto): Promise<ServiceResponseHttpModel> {
        if (params?.limit > 0 && params?.page >= 0)
            return await this.paginateAndFilter(params);
        const response = await this.repository.findAndCount({
            order: {
                updateat: 'DESC',
            },
        });
        return {
            data: plainToInstance(CreateBookDto, response[0]),
            pagination: { totalItems: response[1], limit: 10 },
        };
    }

    async findOne(id: string): Promise<ServiceResponseHttpModel> {
        const book = await this.repository.findOneBy({ id });

        if (!book) {
            throw new NotFoundException('book not found');
        }
        return { data: plainToInstance(CreateBookDto, book) };
    }

    async update(
        id: string,
        payload: UpdateBookDto,
    ): Promise<ServiceResponseHttpModel> {
        const book = await this.repository.preload({ id, ...payload });

        if (!book) {
            throw new NotFoundException("book not found");
        }
        const bookUpdated = await this.repository.save(book);

        return { data: plainToInstance(CreateBookDto, bookUpdated) };
    }

    async remove(id: string): Promise<ServiceResponseHttpModel> {
        const book = await this.repository.findOneBy({ id });

        if (!book) {
            throw new NotFoundException("book not found");
        }
        const bookDelete = await this.repository.softRemove(book);

        return { data: plainToInstance(CreateBookDto, bookDelete) };
    }
    async removeAll(payload: BookEntity[]): Promise<ServiceResponseHttpModel> {
        const bookDeleted = await this.repository.softRemove(payload);
        return { data: bookDeleted };
    }
    private async paginateAndFilter(
        params: FilterBookDto
    ): Promise<ServiceResponseHttpModel> {
        let where: FindOptionsWhere<BookEntity> | FindOptionsWhere<BookEntity>[];
        where = {};
        let { page, search } = params;
        const { limit } = params;

        if (search) {
            search = search.trim();
            page = 0;
            where = [];
            where.push({ title: ILike(% ${ search } %) });
        }

        const response = await this.repository.findAndCount({
            where,
            take: limit,
            skip: PaginationDto.gettOffset(limit, page),
            order: {
                updatedat: 'DESC',
            },

        });
        return {
            data: plainToInstance(CreateBookDto, response[0]),
            pagination: { limit, totalItems: response[1] },
        }

    }
    async activatebook(payload: CreateBookDto): Promise<ServiceResponseHttpModel> {
        const newbook = this.repository.create(payload);
        const bookCreated = await this.repository.save(newbook);

        return { data: plainToInstance(CreateBookDto, bookCreated) };
    }

    async closebook(id: string): Promise<ServiceResponseHttpModel> {
        const book = await this.repository.findOneBy({ id });

        if (!book) {
            throw new NotFoundException("book not found");
        }
        const bookDelete = await this.repository.softRemove(book);

        return { data: plainToInstance(CreateBookDto, bookDelete) };
    }

}