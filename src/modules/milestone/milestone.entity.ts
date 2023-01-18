import { Job } from "modules/job/job.entity";
import { User } from "modules/user/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Milestone {
  @PrimaryGeneratedColumn()
  milestone_id: number;

  @ManyToOne(type => Job, job => job.milestones)
  job: Job;

  @Column()
  description: string;

  @Column()
  due_date: Date;

  @Column()
  amount: number;

  @Column()
  status: string;
}