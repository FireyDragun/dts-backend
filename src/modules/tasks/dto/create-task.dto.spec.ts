import { ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './create-task.dto';

describe('CreateTaskDto Validation', () => {
  const pipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  });

  const validate = async (dto: any) => {
    return pipe.transform(dto, {
      type: 'body',
      metatype: CreateTaskDto,
    });
  };

  it('should reject empty taskName', async () => {
    await expect(
      validate({
        taskName: '',
        description: 'Test',
        status: 'not started yet',
        dueDate: '2025-12-31T00:00:00.000Z',
      }),
    ).rejects.toThrow();
  });

  it('should reject missing taskName', async () => {
    await expect(
      validate({
        description: 'Test',
        status: 'not started yet',
        dueDate: '2025-12-31T00:00:00.000Z',
      }),
    ).rejects.toThrow();
  });

  it('should reject non-string description', async () => {
    await expect(
      validate({
        taskName: 'Test',
        description: 123,
        status: 'not started yet',
        dueDate: '2025-12-31T00:00:00.000Z',
      }),
    ).rejects.toThrow();
  });

  it('should reject invalid status', async () => {
    await expect(
      validate({
        taskName: 'Test',
        description: 'Desc',
        status: 'invalid',
        dueDate: '2025-12-31T00:00:00.000Z',
      }),
    ).rejects.toThrow();
  });

  it('should reject invalid date format', async () => {
    await expect(
      validate({
        taskName: 'Test',
        description: 'Desc',
        status: 'not started yet',
        dueDate: 'not-a-date',
      }),
    ).rejects.toThrow();
  });

  it('should reject unknown fields', async () => {
    await expect(
      validate({
        taskName: 'Test',
        description: 'Desc',
        status: 'not started yet',
        dueDate: '2025-12-31T00:00:00.000Z',
        extraField: 'not allowed',
      }),
    ).rejects.toThrow();
  });
  it('should pass valid dto', async () => {
    const dto = {
      taskName: 'Valid Task',
      description: 'Valid Desc',
      status: 'in-progress',
      dueDate: '2025-12-31T00:00:00.000Z',
    };

    await expect(validate(dto)).resolves.toEqual(dto);
  });
});
