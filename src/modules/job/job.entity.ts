import { JobReview } from "modules/job_review/job_review.entity";
import { Message } from "modules/message/message.entity";
import { Milestone } from "modules/milestone/milestone.entity";
import { Proposal } from "modules/proposal/proposal.entity";
import { User } from "modules/user/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  job_id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  budget: number;

  @Column("text", { array: true })
  skills: string[];

  @ManyToOne(type => User, user => user.jobs)
  client: User;

  @Column()
  category: string;

  @Column()
  status: string;

  @Column()
  deadline: Date;

  @OneToMany(type => Proposal, proposal => proposal.job)
  proposals: Proposal[];

  @OneToMany(type => Milestone, milestone => milestone.job)
  milestones: Milestone[];

  @OneToMany(type => Message, message => message.job)
  messages: Message[];

  @OneToMany(type => JobReview, jobReview => jobReview.job)
  reviews: JobReview[];
}
