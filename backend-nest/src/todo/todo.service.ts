import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  create(createTodoDto: CreateTodoDto) {
    return this.todoRepository.save(createTodoDto);
  }

  findAll(status?: boolean) {
    if (!status) {
      return this.todoRepository.find();
    } else {
      return this.todoRepository.findBy({ status });
    }
  }

  findOne(task_id: number) {
    return this.todoRepository.findOneBy({ task_id });
  }

  async update(task_id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOneBy({ task_id });
    if (!todo) {
      throw new NotFoundException('to do not found');
    }
    todo.name = updateTodoDto.name;
    todo.status = updateTodoDto.status;
    return this.todoRepository.save(todo);
  }

  remove(task_id: number) {
    this.todoRepository.delete(task_id);
  }
}
