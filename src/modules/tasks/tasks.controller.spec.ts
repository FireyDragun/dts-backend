import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTask: Task = {
    id: 1,
    taskName: 'Test Task',
    description: 'Test Description',
    status: 'not started yet',
    dueDate: '2025-12-31T00:00:00.000Z',
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should call service.create with the correct DTO', async () => {
    const dto: CreateTaskDto = {
      taskName: 'Test Task',
      description: 'Test Description',
      status: 'not started yet',
      dueDate: '2025-12-31T00:00:00.000Z',
    };

    jest.spyOn(service, 'create').mockResolvedValue(mockTask);

    await controller.create(dto);

    expect(service.create).toHaveBeenCalledTimes(1);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return the created task from the service', async () => {
    const dto: CreateTaskDto = {
      taskName: 'Test Task',
      description: 'Test Description',
      status: 'not started yet',
      dueDate: '2025-12-31T00:00:00.000Z',
    };

    jest.spyOn(service, 'create').mockResolvedValue(mockTask);

    const result = await controller.create(dto);

    expect(result).toEqual(mockTask);
  });

  it('should throw if the service throws', async () => {
    const dto: CreateTaskDto = {
      taskName: 'Test Task',
      description: 'Test Description',
      status: 'not started yet',
      dueDate: '2025-12-31T00:00:00.000Z',
    };

    jest.spyOn(service, 'create').mockRejectedValue(new Error('Service failed'));

    await expect(controller.create(dto)).rejects.toThrow('Service failed');
  });
});
