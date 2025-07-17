import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Bootcamp } from './bootcamp.entity';

export enum LeadStatus {
  NOUVEAU = 'NOUVEAU',
  CONTACTE = 'CONTACTE',
  INSCRIT = 'INSCRIT',
}

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column('text')
  message: string;

  @Column({
    type: 'enum',
    enum: LeadStatus,
    default: LeadStatus.NOUVEAU,
  })
  status: LeadStatus;

  @Column()
  bootcampId: string;

  @ManyToOne(() => Bootcamp, (bootcamp) => bootcamp.leads)
  @JoinColumn({ name: 'bootcampId' })
  bootcamp: Bootcamp;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 