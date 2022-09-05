import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import { Expose } from "class-transformer";
import User from "./User";

@Entity("subs") //table name
export default class Sub extends BaseEntity {
  @Index()
  @Column({ unique: true })
  name: string;

  @Index()
  @Column({ type: "text", nullable: true })
  description: string;

  @Index()
  @Column({ nullable: true })
  imageUrn: string;

  @Index()
  @Column({ nullable: true })
  bannerUrn: string;

  @Column()
  username: string;

  //name:외래키의 속성 명, referencedColumnName: 참조 엔티티의 참조 속성명
  //name를 표시하지 않으면 propertyName + referencedColumnName이 default
  //referencedColumnName를 표시하지 않으면 id가 default
  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @Expose()
  get imageUrl(): string {
    return this.imageUrn
      ? `${process.env.APP_URL}/images/${this.imageUrn}`
      : "https://www.gravator.com/avatar?d=mp&f=y";
  }

  @Expose()
  get bannerUrl(): string {
    return this.bannerUrn
      ? `${process.env.APP_URL}/images/${this.bannerUrn}`
      : undefined;
  }
}
