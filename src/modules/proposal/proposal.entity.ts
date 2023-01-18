import { Job } from "modules/job/job.entity";
import { User } from "modules/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Proposal {
  @PrimaryGeneratedColumn()
  proposal_id: number;

  @ManyToOne(type => User, user => user.proposals)
  freelancer: User;

  @ManyToOne(type => Job, job => job.proposals)
  job: Job;

  @Column()
  cover_letter: string;

  @Column()
  amount: number;

  @Column()
  status: string;

  @Column()
  duration: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}