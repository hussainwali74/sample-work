import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class SharedEntity {
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true, onUpdate: 'NOW()' })
  updated_at?: Date;

  @DeleteDateColumn({ type: 'timestamp', default: null })
  deleted_at?: Date;
}