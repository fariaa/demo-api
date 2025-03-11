import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { nanoid } = require('nanoid');

@Entity("users")
export class User {
    
    @PrimaryColumn()
    id: string;

    @Column({ unique: true })
    email: string;
  
    @Column()
    password: string; // A senha será armazenada como um hash
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    generateId() {
        this.id = `user_${nanoid()}`;
    }
}
