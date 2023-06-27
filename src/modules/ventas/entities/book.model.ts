import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
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
  