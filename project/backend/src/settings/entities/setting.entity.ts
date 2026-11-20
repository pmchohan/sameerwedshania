import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('wedding_settings')
export class WeddingSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ length: 64 })
  key: string;

  @Column({ type: 'text' })
  value: string;
}
