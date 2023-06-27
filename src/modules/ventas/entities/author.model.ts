import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { BookEntity } from './book.model';

@Entity('Authors', { schema: 'libros' })
export class AuthorEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        name: 'create_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createAt: Date;
    @UpdateDateColumn({
        name: 'Update_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updateAt: Date;
    @DeleteDateColumn({
        name: 'create_at',
        type: 'timestamp',
        nullable: true,
    })
    deleteAt: Date;

    @Column('varchar', {
        name: 'name',
        nullable: false,
        comment: 'Nombre del Autor',
    })
    name: string;
    @Column('varchar', {
        name: 'lastName',
        nullable: false,
        comment: 'Apellido del Autor',
    })
    lastName: string;
    @Column('number', {
        name: 'age',
        nullable: false,
        comment: 'Edad del Autor',
    })
    age: number;
    @Column('varchar', {
        name: 'description',
        nullable: false,
        comment: 'Description de los libros que escribe',
    })
    description: string;
    @Column('number', {
        name: 'books',
        nullable: false,
        comment: 'Libro Escrito',
    })
    books: BookEntity;
}
