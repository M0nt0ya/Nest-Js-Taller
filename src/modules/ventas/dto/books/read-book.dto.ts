import { BaseBookDto } from "./base-book.dto";
import { Exclude, Expose } from 'class-transformer';



export class ReadBookDto extends BaseBookDto {
    @Expose()
    readonly id;
  
    @Expose()
    readonly description;

    @Expose()
    readonly name;
  

    
}