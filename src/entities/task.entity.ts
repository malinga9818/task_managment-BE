import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,} from "typeorm";
import type { Relation } from "typeorm";
import { User } from "./user.entity.js";

@Entity()
export class Task {
    @PrimaryGeneratedColumn({type:"int"})
    id!:number;

    @Column({type:"varchar"})
    title!:string;

    @Column({type:"varchar"})
    description!:string;

    @Column({type:"timestamp", nullable:false})
    due_date!:Date;

    @Column({type:"varchar"})
    priority!:string;

    @Column({type:"varchar"})
    status!:string;

    @Column({type:"timestamp", nullable:true})
    createdAt?:Date | null

    @ManyToOne(() => User, (user) => user.tasks, { onDelete: "CASCADE", nullable: false })
    @JoinColumn({name:"user_id"})
    user!:Relation<User>; // ← wrapped in Relation<>
}