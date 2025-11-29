import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';

describe('TasksService', () => {
  let service: TasksService;
  let repository: Repository<Task>;

  const mockTask: Task = {
    id: 1,
    taskName: 'Test Task',
    description: 'Test Description',
    status: 'not started yet',
    dueDate: '2025-12-31T00:00:00.000Z',
    createdAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get(getRepositoryToken(Task));
  });

  it('should call repository.create with DTO', async () => {
    const dto: CreateTaskDto = {
      taskName: 'Test Task',
      description: 'Test Description',
      status: 'not started yet',
      dueDate: '2025-12-31T00:00:00.000Z',
    };

    repository.create = jest.fn().mockReturnValue(mockTask);
    repository.save = jest.fn().mockResolvedValue(mockTask);

    await service.create(dto);

    expect(repository.create).toHaveBeenCalledWith(dto);
  });

  it('should call repository.save with created task', async () => {
    const dto: CreateTaskDto = {
      taskName: 'Test Task',
      description: 'Test Description',
      status: 'not started yet',
      dueDate: '2025-12-31T00:00:00.000Z',
    };

    repository.create = jest.fn().mockReturnValue(mockTask);
    repository.save = jest.fn().mockResolvedValue(mockTask);

    await service.create(dto);

    expect(repository.save).toHaveBeenCalledWith(mockTask);
  });

  it('should return saved task', async () => {
    const dto: CreateTaskDto = {
      taskName: 'Test Task',
      description: 'Test Description',
      status: 'not started yet',
      dueDate: '2025-12-31T00:00:00.000Z',
    };

    repository.create = jest.fn().mockReturnValue(mockTask);
    repository.save = jest.fn().mockResolvedValue(mockTask);

    const result = await service.create(dto);

    expect(result).toEqual(mockTask);
  });

  it('should throw if repository.save throws', async () => {
    const dto: CreateTaskDto = {
      taskName: 'Test Task',
      description: 'Test Description',
      status: 'not started yet',
      dueDate: '2025-12-31T00:00:00.000Z',
    };

    repository.create = jest.fn().mockReturnValue(mockTask);
    repository.save = jest.fn().mockRejectedValue(new Error('DB error'));

    await expect(service.create(dto)).rejects.toThrow('DB error');
  });
});
