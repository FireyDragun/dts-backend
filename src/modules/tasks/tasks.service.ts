import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task: Task = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(task);
  }
}
