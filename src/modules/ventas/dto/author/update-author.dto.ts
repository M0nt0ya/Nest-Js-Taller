import { BaseAuthorDto } from "./base-author.dto";
import {PartialType} from '@nestjs/swagger';


export class UpdateAuthorDto extends PartialType(BaseAuthorDto){
    
    

}