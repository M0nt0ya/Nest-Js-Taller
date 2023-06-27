import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from 'src/shared/enums/repository.enum';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
//import { ServiceResponseHttpModel } from '@shared/models';
import { plainToInstance } from 'class-transformer';
import { response } from 'express';
import { PaginationDto } from '../dto/pagination/pagination.dto';
import { ServiceResponseHttpModel } from 'src/shared/models/service-response-http.model';
import { AuthorEntity } from '../entities/author.model';
import { CreateAuthorDto } from '../dto/author/create-author.dto';
import { FilterAuthorDto } from '../dto/author/filter-author.dto';


@Injectable()
export class AuthorService {
    [x: string]: any;
  constructor(
    @Inject(RepositoryEnum.AUTHOR_REPOSITORY)
    private repository: Repository<AuthorEntity>,
  ) {}
  async create(payload: CreateAuthorDto): Promise<ServiceResponseHttpModel> {
    const newauthor = this.repository.create(payload); //se crea el authoro
    const authorCreated = this.repository.save(newauthor); //guardar el authoro nuevo creado
    return { data: plainToInstance(CreateAuthorDto, authorCreated) }; //visualizamos
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const newEvent = this.repository.findAndCount({ take: 1000 });
    return {
      data: this.response[0],
      pagination: { totaItems: response[1], limit: 10 },
    };
  }

  //*Es asicrono cuando de vuelve una promesa
  async findAll(params?: FilterAuthorDto): Promise<ServiceResponseHttpModel> {
    if (params?.limit > 0 && params?.page >= 0)
      return await this.paginateAndFilter(params);
    const response = await this.repository.findAndCount({
      order: {
        updateAt: 'DESC',
      },
    });
    return {
      data: plainToInstance(CreateAuthorDto, response[0]),
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findOne(id: string): Promise<ServiceResponseHttpModel> {
    const author = await this.repository.findOneBy({ id });

    if (!author) {
      throw new NotFoundException('Project not found');
    }
    return { data: plainToInstance(CreateAuthorDto, author) };
  }

  async update(
    id: string,
    payload: CreateAuthorDto,
): Promise<ServiceResponseHttpModel> {
    const author = await this.repository.preload({ id, ...payload });

    if (!author) {
        throw new NotFoundException("author not found");
    }
    const authorUpdated = await this.repository.save(author);

    return { data: plainToInstance(CreateAuthorDto, authorUpdated) };
}

async remove(id: string): Promise<ServiceResponseHttpModel> {
    const author = await this.repository.findOneBy({ id });

    if (!author) {
        throw new NotFoundException("author not found");
    }
    const authorDelete = await this.repository.softRemove(author);

    return { data: plainToInstance(CreateAuthorDto, authorDelete) };
}
//cuidado con este metodo este is es necesario 
async removeAll(payload: AuthorEntity[]): Promise<ServiceResponseHttpModel> {
    const authorsDeleted = await this.repository.softRemove(payload);
    return { data: authorsDeleted };
}
private async paginateAndFilter(
    params: FilterAuthorDto
): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<AuthorEntity> | FindOptionsWhere<AuthorEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
        search = search.trim();
        page = 0;
        where = [];
        where.push({ title: ILike(%${search}%) });
    }

    const response = await this.repository.findAndCount({
        where,
        take: limit,
        skip: PaginationDto.gettOffset(limit, page),
        order: {
            updatedAt: 'DESC'
        },

    });
    return {
        data: plainToInstance(CreateAuthorDto, response[0]),
        pagination: { limit, totalItems: response[1] },
    }

}
async activateauthor(payload: CreateAuthorDto): Promise<ServiceResponseHttpModel> {
    const newauthor = this.repository.create(payload);
    const authorCreated = await this.repository.save(newauthor);

    return { data: plainToInstance(CreateAuthorDto, authorCreated) };
  }
  
  async closeauthor(id: string): Promise<ServiceResponseHttpModel> {
    const author = await this.repository.findOneBy({ id });

    if (!author) {
        throw new NotFoundException("author not found");
    }
    const authorDelete = await this.repository.softRemove(author);

    return { data: plainToInstance(CreateAuthorDto, authorDelete) };
}

/*setEmail(){
if(!this.email){
   return;
}
this.email = this.email.toLowerCase().trim();

async hashPassword(){
    if(!this.password){
        return;
    }
    this.password = await Bcrypt.hash(this.password, 12);
}*/
}