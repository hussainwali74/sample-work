import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsString } from 'class-validator';
import { SharedEntity } from 'src/shared/shared.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Todo')
export class TodoEntity extends SharedEntity {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn('increment')
  public task_id!: number;

  @ApiProperty({
    type: String,
    description: 'task name',
    required: true,
  })
  @IsString()
  @Column('varchar')
  name: string;

  @ApiProperty({
    type: String,
    example: 'task description',
  })
  @Column('varchar', { nullable: true })
  public description: string;

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  @IsBoolean()
  @Column({ type: 'bool' })
  public status: boolean;
}
