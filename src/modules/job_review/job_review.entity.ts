import { Job } from "modules/job/job.entity";
import { User } from "modules/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class JobReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  rating: number;

  @ManyToOne(type => Job, job => job.reviews)
  job: Job;

  @ManyToOne(type => User, user => user.review_as_freelancer)
  freelancer: User;

  @ManyToOne(type => User, user => user.review_as_employer)
  employer: User;
}