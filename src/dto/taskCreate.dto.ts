import { IsDateString, IsIn, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    title!:string

    @IsString()
    description!:string

    @IsDateString()
    due_date!: Date

    @IsIn(["High", "Medium", "Low"])
    priority!:string

    @IsIn(["To Do", "In Progress", "Completed"])
    status!:string
}