import { BeforeInsert, Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Author } from '../../authors/entities/author.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { nanoid } = require('nanoid');

@Entity('articles')
export class Article {
    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    slug: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'text' })
    content: string;

    @ManyToOne(() => Author, (author) => author.articles, { nullable: false })
    author: Author; // Relacionamento: um autor pode ter vários artigos

    @Column({ type: 'datetime', nullable: true })
    publishedAt: Date;

    @Column({ type: 'varchar', length: 50, default: 'rascunho' })
    status: string;

    @Column('simple-array')
    tags: string[];

    @Column('simple-array')
    categories: string[];

    @Column({ type: 'varchar', nullable: true })
    coverImage: string;

    @Column('simple-array')
    externalLinks: string[];

    @Column({ type: 'int', default: 0 })
    views: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    generateId() {
        this.id = `article_${nanoid()}`;
    }
}
