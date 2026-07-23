var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
import { User } from "./user.entity.js";
let Task = class Task {
    id;
    title;
    description;
    due_date;
    priority;
    status;
    createdAt;
    user; // ← wrapped in Relation<>
};
__decorate([
    PrimaryGeneratedColumn({ type: "int" }),
    __metadata("design:type", Number)
], Task.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    Column({ type: "timestamp", nullable: false }),
    __metadata("design:type", Date)
], Task.prototype, "due_date", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], Task.prototype, "priority", void 0);
__decorate([
    Column({ type: "varchar" }),
    __metadata("design:type", String)
], Task.prototype, "status", void 0);
__decorate([
    Column({ type: "timestamp", nullable: true }),
    __metadata("design:type", Object)
], Task.prototype, "createdAt", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.tasks, { onDelete: "CASCADE", nullable: false }),
    JoinColumn({ name: "user_id" }),
    __metadata("design:type", Object)
], Task.prototype, "user", void 0);
Task = __decorate([
    Entity()
], Task);
export { Task };
//# sourceMappingURL=task.entity.js.map