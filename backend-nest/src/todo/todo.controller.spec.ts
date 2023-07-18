import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  let controller: TodoController;
  let mockTodo: TodoEntity = new TodoEntity();
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService, {
        provide: getRepositoryToken(TodoEntity),
        useValue: {
          save: jest.fn().mockResolvedValue(mockTodo),
          find: jest.fn().mockResolvedValue([mockTodo])
        }
      }],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of todos', async () => {
      const result = [
        {
          "task_id": 1,
          "name": "write full stack book",
          "description": "write full stack book description",
          "status": false
        }
      ];
      jest.spyOn(todoService, 'findAll').mockImplementation(() => Promise.resolve(result));
      expect(await controller.findAll()).toBe(result);
    })
  })
});