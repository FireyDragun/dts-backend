import { IsDateString, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  taskName: string;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['not started yet', 'in-progress', 'complete'])
  status: 'not started yet' | 'in-progress' | 'complete';

  @IsDateString()
  @IsNotEmpty()
  dueDate: string;
}
