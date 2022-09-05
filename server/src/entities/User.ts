import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
} from "typeorm";
import { IsEmail, Length } from "class-validator";

import Post from "./Post";
import Vote from "./Vote";
import bcrypt from "bcryptjs";

@Entity("users") //table name
export default class User extends BaseEntity {
  //인덱스를 생성하여 특정 주체를 더 빨리 찾을 수 있음
  @Index()
  //유효성 검사
  @IsEmail(undefined, { message: "이메일 주소가 잘못되었습니다." })
  @Length(1, 255, { message: "이메일 주소를 비워둘 수 없습니다." })
  @Column({ unique: true })
  email: string;

  @Index()
  @Length(3, 32, { message: "사용자 이름은 3자 이상이여야 합니다." })
  @Column()
  username: string;

  @Column()
  @Length(6, 255, { message: "비밀번호는 6자리 이상이어야 합니다." })
  password: string;

  //OneToMany: 1 -> may post (Relationsship)
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}
