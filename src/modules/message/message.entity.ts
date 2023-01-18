import { Job } from "modules/job/job.entity";
import { User } from "modules/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  message_id: number;

  @ManyToOne(type => User, user => user.sent_messages)
  sender: User;

  @ManyToOne(type => User, user => user.received_messages)
  recipient: User;

  @ManyToOne(type => Job, job => job.messages)
  job: Job;

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}