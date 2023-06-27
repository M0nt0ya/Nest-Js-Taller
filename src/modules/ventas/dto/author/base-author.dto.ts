import {
    IsString,
    Allow,
    IsBoolean,
    IsNumber,
    IsNotEmpty,
    ArrayNotEmpty,
    IsArray,
    IsPositive,
    IsInt,
  } from 'class-validator';

  import {
    isBooleanValidationOptions,
    isNotEmptyValidationOptions,
    isNumberValidationOptions,
    isStringValidationOptions,
    IsArrayValidationOptions,
    isPositiveValidationOptions,
    IsIntValidationOptions
  } from 'src/shared/validation/validations-message';

  //validar los campos de la clase

  export class BaseAuthorDto {

    @IsNumber()
    @IsNotEmpty()
    readonly id: number;

    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsString(isStringValidationOptions())
    readonly name: string;

    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsString(isStringValidationOptions())
    readonly lastname: string;
  
    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsNumber(isNumberValidationOptions())
    @IsPositive(isPositiveValidationOptions)
    readonly age: number;

    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsString(isStringValidationOptions())
    readonly description: string;



    @IsNotEmpty(isNotEmptyValidationOptions())
    @IsInt(IsIntValidationOptions())
    @IsString(isNumberValidationOptions())
    readonly booksId: number;




  }