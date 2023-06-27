import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { AuthorEntity } from './author.model';
  
  @Entity('Books', { schema: 'libros' })
  export class BookEntity {
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
  

    //RELACIONES

    @OneToMany(() => AuthorEntity, (author) => author.book)
    @JoinColumn({name:'author_id'})
    author: AuthorEntity;
 
    ///

    @Column('varchar', {
      name: 'name',
      nullable: false,
      comment: 'Nombre del Libro',
    })
    name: string;
    @Column('varchar', {
      name: 'description',
      nullable: true,
      comment: 'Description del Libro',
    })
    description: string;

    @Column('varchar', {
        name: 'Publication',
        nullable: true,
        comment: 'Año de publicacion del Libro',
      })
      Publication: string;
  }

function OneToMany(arg0: () => any, arg1: (product: any) => any): (target: BookEntity, propertyKey: "product") => void {
  throw new Error('Function not implemented.');
}

function JoinColumn(arg0: { name: string; }): (target: BookEntity, propertyKey: "product") => void {
  throw new Error('Function not implemented.');
}
  