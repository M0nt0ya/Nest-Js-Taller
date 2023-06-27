
import { Exclude, Expose } from 'class-transformer';
import { BaseAuthorDto } from './base-author.dto';

@Exclude()
export class ReadAuthorDto extends BaseAuthorDto {
  //exponer el valor del atributo
  @Expose()
  readonly title;

  @Expose()
  readonly description;

  @Expose()
  readonly price;

  @Expose()
  readonly categoryId;

  @Expose()
  readonly images;

}