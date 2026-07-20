import { IsDateString, IsOptional, IsString, IsIn } from "class-validator";

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    title?:string

    @IsOptional()
    @IsString()
    description?:string

    @IsOptional()
    @IsDateString()
    due_date?: string

    @IsOptional()
    @IsIn(["High", "Medium", "Low"])
    priority?: string

    @IsOptional()
    @IsIn(["To Do", "In Progress", "Completed"])
    status?:string
}