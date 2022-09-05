import { BaseEntity, Column, Entity, Index } from "typeorm";

@Entity("posts") //table name
export default class Post extends BaseEntity {
  @Index()
  @Column()
  user: string;
}
