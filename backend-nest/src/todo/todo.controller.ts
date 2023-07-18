import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CustomApiCreateOperations, postCustomApiPostResponse } from 'src/shared/shared.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @ApiOperation(CustomApiCreateOperations('todo'))
  @ApiOperation({ summary: 'add todo' })
  @ApiResponse(postCustomApiPostResponse('Todo'))
  @ApiBody({ type: TodoEntity, required: false })
  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll(@Query('status') status?: boolean) {
    return this.todoService.findAll(status);
  }

  @Get(':task_id')
  findOne(@Param('task_id') task_id: string) {
    return this.todoService.findOne(+task_id);
  }

  @Put(':task_id')
  update(@Param('task_id') task_id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+task_id, updateTodoDto);
  }

  @Delete(':task_id')
  remove(@Param('task_id') task_id: string) {
    return this.todoService.remove(+task_id);
  }
}