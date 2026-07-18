import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity.js";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    title!:string;

    @Column()
    description!:string;

    @Column()
    due_date!:Date;

    @Column()
    priority!:string;

    @Column()
    status!:string;

    @ManyToOne(() => User, (user) => user.tasks, { onDelete: "CASCADE", nullable: false })
    @JoinColumn({name:"user_id"})
    user!:User;
}