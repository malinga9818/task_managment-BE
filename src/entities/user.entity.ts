import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task.entity.js";

@Entity()
export class User {
    @PrimaryGeneratedColumn({type:"int"})
    id!: number;

    @Column({type:"varchar"})
    firstName!: string;

    @Column({type:"varchar"})
    lastName!: string;

    @Column({type:"varchar"})
    email!: string;

    @Column({type:"varchar", select: false})
    password!: string;

    @OneToMany(() => Task, (tasks) => tasks.user)
    tasks!:Task[];

}