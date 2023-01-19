import { RegisterPayload } from '../../modules/auth';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Job } from 'modules/job/job.entity';
import { Proposal } from 'modules/proposal/proposal.entity';
import { JobReview } from 'modules/job_review/job_review.entity';
import { Message } from 'modules/message/message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ default: 'freelancer' })
  role: string;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  location: string;

  @Column("text", { array: true, nullable: true })
  skills: string[];

  @Column({ type: "float", nullable: true })
  rating: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(type => Job, job => job.client)
  jobs: Job[];

  @OneToMany(type => Proposal, proposal => proposal.freelancer)
  proposals: Proposal[];

  @OneToMany(type => JobReview, jobReview => jobReview.freelancer)
  review_as_freelancer: JobReview[];

  @OneToMany(type => JobReview, jobReview => jobReview.freelancer)
  review_as_employer: JobReview[];

  @OneToMany(type => Message, message => message.sender)
  sent_messages: Message[];

  @OneToMany(type => Message, message => message.recipient)
  received_messages: Message[];
}

