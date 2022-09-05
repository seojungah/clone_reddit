import { BaseEntity, Column, Entity, Index } from "typeorm";

@Entity("votes") //table name
export default class Vote extends BaseEntity {
  @Index()
  @Column()
  user: string;
}
