import { BeforeInsert, Entity, Column, PrimaryColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Article } from '../../articles/entities/article.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { nanoid } = require('nanoid');

@Entity('authors')
export class Author {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    bio: string; // Breve descrição ou biografia do autor

    @Column({ type: 'varchar', length: 255, nullable: true })
    profilePicture: string; // Link para a foto de perfil do autor

    @OneToMany(() => Article, (article) => article.author)
    articles: Article[]; // Relacionamento com os artigos escritos pelo autor

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    generateId() {
        this.id = `author_${nanoid()}`;
    }
}
