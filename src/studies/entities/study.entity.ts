import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { nanoid } = require('nanoid');

@Entity("studies")
export class Study {
    
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;
    
    @Column()
    description: string;

    @BeforeInsert()
    generateId() {
        this.id = `study_${nanoid()}`;
    }
}
